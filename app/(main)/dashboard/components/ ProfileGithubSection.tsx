// import SocialLinks from "./SocialLinks"
// import ConnectGithub from "./ConnectGithub"
// import SyncStatus from "./ConnectGithub"

// interface ProfileGithubSectionProps {
//   repoCount: number
//   syncStatus: SyncStatus  // not string
//   lastSyncedAt: string | null  // also: string, not null-safe
// }

// export default function ProfileGithubSection({
//   repoCount,
//   syncStatus,
//   lastSyncedAt
// }: ProfileGithubSectionProps) {

//   return (
//     <div className="border bg-card p-5 space-y-5">

//       {/* Profile Info */}
//       <div className="flex items-center gap-4">

//         <div className="h-14 w-14 overflow-hidden rounded-full border">
//           <img
//             src="/avatar.png"
//             alt="avatar"
//             className="h-full w-full object-cover"
//           />
//         </div>

//         <div>
//           <h3 className="font-semibold text-lg">Abhishek Kumar</h3>
//           <p className="text-sm text-muted-foreground">@abhishek</p>
//         </div>

//       </div>

//       {/* Description */}
//       <p className="text-sm text-muted-foreground">
//       </p>

//       {/* Social Links */}
//       <SocialLinks />

//       {/* GitHub Section */}
//       <ConnectGithub
//         syncStatus={syncStatus}
//         lastSyncedAt={lastSyncedAt}
//         repoCount={repoCount}
//       />

//     </div>
//   )
// }