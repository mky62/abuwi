import SocialLinks from "./SocialLinks"

export default function ProfileGithubSection() {




  return (
    <div className="border bg-card p-5 space-y-5">

      {/* Profile Info */}
      <div className="flex items-center gap-4">

        <div className="h-14 w-14 overflow-hidden rounded-full border">
          <img
            src="/avatar.png"
            alt="avatar"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h3 className="font-semibold text-lg">Abhishek Kumar</h3>
          <p className="text-sm text-muted-foreground">@abhishek</p>
        </div>

      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground">
      </p>

      {/* Social Links */}
      <SocialLinks />

      {/* GitHub Section */}
      <div className="flex items-center justify-between rounded-lg border p-3">

        <div className="flex items-center gap-3">


          <div className="flex size-9 items-center justify-center rounded-lg bg-secondary">
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.39c.6.11.79-.26.79-.58v-2.02c-3.34.72-4.03-1.42-4.03-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.09-.75.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.57A12 12 0 0012 0z" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-medium">GitHub</p>
            <p className="text-xs text-muted-foreground">
              24 repositories cached
            </p>
          </div>

        </div>

        <button className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-muted transition">
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
          </svg>
          Sync
        </button>

      </div>

    </div>
  )
}