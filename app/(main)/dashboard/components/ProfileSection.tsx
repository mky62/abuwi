"use client"

export default function ProfileSection() {
  return (
    <div className="w-full mb-4 p-4  border border-gray-200 bg-white backdrop-blur-sm space-y-4">

      {/* Avatar + identity */}
      <div className="flex items-center gap-4">
        <img
          src="/avatar.png"
          alt="avatar"
          className="w-14 h-14 rounded-full object-cover border"
        />

        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-900">
            Abhishek Kumar
          </span>
          <span className="text-sm text-gray-500">
            @github-username
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600">
        Backend engineer building developer tooling and GitHub analytics systems.
                Backend engineer building developer tooling and GitHub analytics systems.

        Backend engineer building developer tooling and GitHub analytics systems.
        Backend engineer building developer tooling and GitHub analytics systems.
        Backend engineer building developer tooling and GitHub analytics systems.
        Backend engineer building developer tooling and GitHub analytics systems.
        Backend engineer building developer tooling and GitHub analytics systems.
        Backend engineer building developer tooling and GitHub analytics systems.
        Backend engineer building developer tooling and GitHub analytics systems.

      </p>

      {/* Edit button */}
      <button className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800">
        Edit Profile
      </button>

    </div>
  )
}