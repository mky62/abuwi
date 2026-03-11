import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import ConnectGithub from "./ConnectGithub";

export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        redirect("/sign-up");
    }

    const userId = session.user.id;

    const [user, repoCount] = await Promise.all([
        db.user.findUnique({
            where: { id: userId },
            select: { syncStatus: true, lastSyncedAt: true },
        }),
        db.repo.count({ where: { userId } }),
    ]);

    return (
        <ConnectGithub
            syncStatus={user?.syncStatus ?? "IDLE"}
            lastSyncedAt={user?.lastSyncedAt?.toISOString() ?? null}
            repoCount={repoCount}
        />
    );
}