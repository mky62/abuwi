"use client"

import RotatingText from "./RotatingText"
import { GitHubIcon } from "./Icons"
import AuthBg from "@/public/signinbg.jpg"
import Image from "next/image"
import { signIn, useSession } from "@/lib/auth-client"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function SignUpForm() {

    const { data, isPending } = useSession()

    if (isPending) return null // or a loading spinner

    if (data) {
        redirect("/dashboard")
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        signIn.social({
            provider: "github",
            callbackURL: "/dashboard",
        })
    }

    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">

            <Image
                src={AuthBg}
                alt="Authentication background"
                fill
                priority
                sizes="100vw"
                className="absolute inset-0 -z-20 object-cover"
            />

            {/* Main Panel */}
            <div className="relative z-10 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl m-4 px-6 py-12 sm:px-8 sm:py-10 space-y-10 w-full max-w-xl">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-geom tracking-tight text-blue-900">
                        CodePatron
                    </h1>

                    <p className="text-md text-blue-800 flex justify-center items-center gap-1">
                        Welcome back ✨
                        <span className="inline-flex items-center">
                            <RotatingText
                                texts={[
                                    "developer",
                                    "builder",
                                    "creator",
                                    "vibe coder",
                                    "contributor",
                                    "innovator",
                                    "engineer"
                                ]}
                                mainClassName="inline-flex text-xl text-white font-courgette font-bold overflow-hidden"
                                staggerFrom="last"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.065}
                                splitLevelClassName="overflow-hidden"
                                transition={{ type: "spring", damping: 60, stiffness: 600 }}
                                rotationInterval={3000}
                            />
                        </span>
                    </p>
                </div>


                <Button
                    type="button"
                    onClick={handleClick}
                    className="w-full py-6 cursor-pointer bg-blue-900 text-white"
                >
                    <GitHubIcon /> Sign in with GitHub
                </Button>





                {/* Footer */}
                <p className="text-center text-sm font-light text-blue-800">
                    Be part of the{" "}
                    <span className="font-semibold underline cursor-pointer text-blue-900">
                        <a href="/">CodePatron</a>
                    </span>{" "}
                    community
                </p>

            </div>
        </div>
    )
}
