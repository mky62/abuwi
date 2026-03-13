"use client"

import { useState } from "react"

export default function QrSection() {
  const [image, setImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const imageUrl = URL.createObjectURL(file)
    setImage(imageUrl)
  }

  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">

      {/* Image Preview */}
      <div className="w-40 h-40 rounded-xl overflow-hidden border flex items-center justify-center bg-muted">
        {image ? (
          <img
            src={image}
            alt="preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-muted-foreground">
            No image selected
          </span>
        )}
      </div>

      {/* Upload Input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="text-sm"
      />

    </div>
  )
}