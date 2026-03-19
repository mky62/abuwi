"use client"

import { useState, useRef } from "react"
import { Camera, Check, X, Pencil, MapPin, Link2 } from "lucide-react"

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("Abhishek Kumar")
  const [username, setUsername] = useState("github-username")
  const [bio, setBio] = useState(
    "Backend engineer building developer tooling and GitHub analytics systems."
  )
  const [location, setLocation] = useState("India")
  const [website, setWebsite] = useState("abhishek.dev")
  const [avatarSrc, setAvatarSrc] = useState("/avatar.png")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const snapshot = useRef({ name, username, bio, location, website, avatarSrc })

  const startEdit = () => {
    snapshot.current = { name, username, bio, location, website, avatarSrc }
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setName(snapshot.current.name)
    setUsername(snapshot.current.username)
    setBio(snapshot.current.bio)
    setLocation(snapshot.current.location)
    setWebsite(snapshot.current.website)
    setAvatarSrc(snapshot.current.avatarSrc)
    setIsEditing(false)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => setAvatarSrc(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-gradient-to-b from-white to-gray-50/80 border border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

      {/* Cover / Banner */}
      <div className="relative h-20 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIvPjwvc3ZnPg==')] opacity-60" />

        {/* Edit button top-right */}
        {!isEditing && (
          <button
            onClick={startEdit}
            className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-white/20 text-white/90 hover:bg-white/30 backdrop-blur-sm transition-all duration-200"
            title="Edit profile"
          >
            <Pencil size={12} />
          </button>
        )}
      </div>

      {/* Avatar overlapping banner */}
      <div className="px-4 -mt-8">
        <div className="relative w-16 h-16 group">
          <img
            src={avatarSrc}
            alt="avatar"
            className="w-16 h-16 rounded-2xl object-cover border-[3px] border-white shadow-sm"
          />
          {isEditing && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Camera size={16} className="text-white" />
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          {/* Online dot */}
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-4 space-y-3">

        {/* Identity */}
        {isEditing ? (
          <div className="space-y-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full text-sm font-semibold text-gray-900 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
            />
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">@</span>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full text-xs text-gray-600 bg-white border border-gray-200 rounded-lg pl-6 pr-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
              />
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-tight">{name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">@{username}</p>
          </div>
        )}

        {/* Bio */}
        {isEditing ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="Short bio…"
            className="w-full text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
          />
        ) : (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{bio}</p>
        )}

        {/* Meta tags */}
        {isEditing ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MapPin size={12} className="text-gray-400 shrink-0" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="flex-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Link2 size={12} className="text-gray-400 shrink-0" />
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website"
                className="flex-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {location && (
              <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                <MapPin size={11} />
                {location}
              </span>
            )}
            {website && (
              <span className="inline-flex items-center gap-1 text-xs text-blue-500 hover:underline cursor-pointer">
                <Link2 size={11} />
                {website}
              </span>
            )}
          </div>
        )}

        {/* Save / Cancel bar */}
        {isEditing && (
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 shadow-sm shadow-blue-500/20"
            >
              <Check size={12} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
            >
              <X size={12} />
              Cancel
            </button>
          </div>
        )}

      </div>
    </div>
  )
}