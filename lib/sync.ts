import { db } from "@/lib/prisma"
import { fetchRepo } from "@/lib/fetchrepo"

const SYNC_TTL_MS = 15 * 60 * 1000 // 15 minutes

export async function syncRepos(
  userId: string,
  opts?: { force?: boolean }
) {

  const user = await db.user.findUnique({
    where: { id: userId }
  })

  if (!user) return

  // TTL check
  const shouldSync =
    opts?.force ||
    user.syncStatus === "FAILED" ||
    !user.lastSyncedAt ||
    Date.now() - user.lastSyncedAt.getTime() > SYNC_TTL_MS

  if (!shouldSync) {
    return
  }

  // atomic lock
  const lock = await db.user.updateMany({
    where: {
      id: userId,
      syncStatus: { not: "SYNCING" }
    },
    data: {
      syncStatus: "SYNCING"
    }
  })

  if (lock.count === 0) return

  try {

    // get github account with token
    const githubAccount = await db.account.findFirst({
      where: {
        userId,
        providerId: "github"
      }
    })

    if (!githubAccount) {
      throw new Error("GitHub account not connected")
    }

    const token = githubAccount?.accessToken;

    if (!token) {
      throw new Error("GitHub access token not found")
    }

    // fetch repos from github using account data
    const repos = await fetchRepo(token)

    await db.$transaction(async (tx) => {

      for (const repo of repos) {

        if (!repo.id || !repo.full_name || !repo.html_url) continue

        const name =
          repo.name ??
          repo.full_name.split("/").pop() ??
          repo.full_name

        await tx.repo.upsert({
          where: {
            githubRepoId: repo.id
          },
          update: {
            userId,
            accountId: githubAccount.id,
            name,
            fullName: repo.full_name,
            language: repo.language,
            stars: repo.stargazers_count ?? 0,
            forks: repo.forks ?? 0,
            htmlUrl: repo.html_url,
            cachedAt: new Date()
          },
          create: {
            githubRepoId: repo.id,
            userId,
            accountId: githubAccount.id,
            name,
            fullName: repo.full_name,
            language: repo.language,
            stars: repo.stargazers_count ?? 0,
            forks: repo.forks ?? 0,
            htmlUrl: repo.html_url
          }
        })

      }

      // update sync metadata
      await tx.user.update({
        where: { id: userId },
        data: {
          syncStatus: "SUCCESS",
          lastSyncedAt: new Date()
        }
      })

    })

  } catch (error) {

    await db.user.update({
      where: { id: userId },
      data: {
        syncStatus: "FAILED"
      }
    })

    throw error
  }
}