// import { redirect } from "next/navigation";
// import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
// import { db } from "@/lib/prisma";
// import ConnectGithub from "./ConnectGithub";

// export default async function DashboardPage() {
//     const session = await auth.api.getSession({
//         headers: await headers(),
//     });

//     if (!session?.user?.id) {
//         redirect("/sign-up");
//     }

//     const userId = session.user.id;

//     const [user, repoCount] = await Promise.all([
//         db.user.findUnique({
//             where: { id: userId },
//             select: { syncStatus: true, lastSyncedAt: true },
//         }),
//         db.repo.count({ where: { userId } }),
//     ]);

//     return (
//         <ConnectGithub
//             syncStatus={user?.syncStatus ?? "IDLE"}
//             lastSyncedAt={user?.lastSyncedAt?.toISOString() ?? null}
//             repoCount={repoCount}
//         />
//     );
// }



import BgDash from "@/public/signinbg.jpg"
import Image from "next/image"
import QrSection from "./components/QrCode"
import ProfileGithubSection from "./components/ ProfileGithubSection"
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import ConnectGithub from "./components/ConnectGithub";
import GithubHeatmap from "./components/GithubHeatmap";
// import RepoList from "./components/RepoList"
// import ContributionMap from "./components/ContributionMap"

export default async function DashboardPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        redirect("/sign-up");
    }

    const userId = session.user.id;
    const name = session.user.name

    const [user, repoCount] = await Promise.all([
        db.user.findUnique({
            where: { id: userId },
            select: { syncStatus: true, lastSyncedAt: true },
        }),
        db.repo.count({ where: { userId } }),
    ]);



    return (
        <div className="relative h-screen w-full overflow-hidden">

            {/* Background */}
            <Image
                src={BgDash}
                alt="background"
                fill
                className="object-cover -z-10"
            />

            {/* Main layout */}
            <div className="flex h-full gap-3 p-3">

                {/* Sidebar */}
                <aside className="w-85 shrink-0 flex flex-col gap-3">

                    <ProfileGithubSection />

                    <div className="h-px bg-border" />

                    <QrSection />

                </aside>

                {/* Main dashboard */}
                <main className="flex-1 flex flex-col gap-3 overflow-hidden">


                    {/* Contribution map */}
                    <section className="flex-1">
                        <GithubHeatmap username={name} />
                    </section>

                    {/* Repo list */}
                    <section className="flex-1 overflow-y-auto border bg-card p-4">
                    </section>

                </main>

            </div>
        </div>
    )
}