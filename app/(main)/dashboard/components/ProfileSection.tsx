"use client"

import { useState, useRef } from "react"

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("Abhishek Kumar")
  const [username, setUsername] = useState("@github-username")
  const [bio, setBio] = useState(
    "Backend engineer building developer tooling and GitHub analytics systems."
  )
  const [avatarSrc, setAvatarSrc] = useState("/avatar.png")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click()
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarSrc(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    // TODO: persist changes to backend
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="w-full m-4 p-4 border border-gray-200 bg-white backdrop-blur-sm space-y-4">

      {/* Avatar + identity */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={avatarSrc}
            alt="avatar"
            className={`w-14 h-14 rounded-full object-cover border ${isEditing ? "cursor-pointer opacity-80 hover:opacity-60" : ""}`}
            onClick={handleAvatarClick}
          />
          {isEditing && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 cursor-pointer"
              onClick={handleAvatarClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        <div className="flex flex-col gap-1">
          {isEditing ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg font-semibold text-gray-900 border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-sm text-gray-500 border border-gray-300 rounded px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </>
          ) : (
            <>
              <span className="text-lg font-semibold text-gray-900">
                {name}
              </span>
              <span className="text-sm text-gray-500">
                {username}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      {isEditing ? (
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
          className="w-full text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 resize-y focus:outline-none focus:ring-2 focus:ring-black"
        />
      ) : (
        <p className="text-sm text-gray-600">
          {bio}
        </p>
      )}

      {/* Action buttons */}
      {isEditing ? (
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 text-sm rounded-lg bg-black text-white hover:bg-gray-800"
        >
          Edit Profile
        </button>
      )}

    </div>
  )
}