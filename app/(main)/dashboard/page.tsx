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
        <div style={{ padding: "2rem" }}>
            <h1>Dashboard</h1>
            {data.user.image && (
                <img
                    src={data.user.image}
                    alt={data.user.name}
                    style={{ width: 80, height: 80, borderRadius: "50%" }}
                />
            )}
            <p style={{ fontSize: "1.25rem", marginTop: "1rem" }}>
                GitHub Name: <strong>{data.user.name}</strong>
            </p>
        </div>
    )
}