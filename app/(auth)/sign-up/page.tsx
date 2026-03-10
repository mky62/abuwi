"use client"

import { redirect } from "next/navigation"
import { signIn, useSession } from "@/lib/auth-client"

export default function GithubSignIn() {

  const { data, isPending } = useSession()

  if (isPending) return null // or a loading spinner

  if (data) {
    redirect("/dashboard")
  }

  const handleClick = () => {
    signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    })
  }


  return (
    <button onClick={handleClick} >
      Sign in with GitHub
    </button>
  )

}

