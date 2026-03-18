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

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/prisma";
import DashBg from '@/public/dashbg.jpg'
import Image from 'next/image'
import { Star, GitFork, ExternalLink } from "lucide-react"
import ConnectGithub from "./components/ConnectGithub"

export default async function DashboardPage() {

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        redirect("/sign-up");
    }

    const userId = session.user.id;
    const name = session.user.name

    const [user, repoCount, repos] = await Promise.all([
        db.user.findUnique({
            where: { id: userId },
            select: { syncStatus: true, lastSyncedAt: true },
        }),
        db.repo.count({ where: { userId } }),
        db.repo.findMany({
            where: { userId },
            orderBy: { stars: "desc" },
            select: {
                id: true,
                name: true,
                fullName: true,
                description: true,
                language: true,
                stars: true,
                forks: true,
                htmlUrl: true,
            },
        }),
    ]);

    return (
        <div className="h-full w-full flex ">
            <Image
                src={DashBg}
                alt="dashboard-bg"
                className="absolute inset-0 z-[-1] w-full h-full object-cover"
            />
            <div className="relative flex gap-2 h-screen w-full p-4">
                <div className="w-1/4 border-blue-500 border-2 h-full rounded-xl p-2">
                    <ConnectGithub
                        syncStatus={user?.syncStatus ?? "IDLE"}
                        lastSyncedAt={user?.lastSyncedAt?.toISOString() ?? null}
                        repoCount={repoCount}
                    />
                </div>
                <div className="w-2/4 border-blue-500 border-2 h-full rounded-xl ">
                </div>

                {/* Repos Panel */}
                <div className="w-1/4 border-blue-500 border-2 bg-white h-full rounded-xl flex flex-col overflow-hidden">
                    <div className="px-4 py-3 border-b border-blue-100 flex items-center justify-between shrink-0">
                        <h2 className="font-semibold text-gray-800 text-sm">Repositories</h2>
                        <span className="text-xs bg-blue-100 text-blue-600 font-medium px-2 py-0.5 rounded-full">
                            {repoCount}
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                        {repos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2 p-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                                <p className="text-sm">No repositories yet</p>
                            </div>
                        ) : (
                            repos.map((repo) => (
                                <div key={repo.id} className="p-3 hover:bg-gray-50 transition-colors group">
                                    <div className="flex items-start justify-between gap-1">
                                        <p className="text-sm font-medium text-blue-600 truncate leading-tight">
                                            {repo.name ?? repo.fullName}
                                        </p>
                                        <a
                                            href={repo.htmlUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-gray-400 hover:text-blue-500"
                                        >
                                            <ExternalLink size={13} />
                                        </a>
                                    </div>
                                    {repo.description && (
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-snug">
                                            {repo.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-3 mt-1.5">
                                        {repo.language && (
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                                                {repo.language}
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-400 flex items-center gap-0.5">
                                            <Star size={11} />
                                            {repo.stars}
                                        </span>
                                        <span className="text-xs text-gray-400 flex items-center gap-0.5">
                                            <GitFork size={11} />
                                            {repo.forks}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>


        </div>
    )
}