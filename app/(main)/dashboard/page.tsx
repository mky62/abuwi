"use client"

import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth-client";

export default function Dashboard() {
    const { data, isPending } = useSession()

    if (isPending) return null // or a loading spinner

    if (!data) {
        redirect("/sign-up")
    }

    return (
        <div>Dashboard</div>
    )
}