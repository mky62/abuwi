import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // your Better Auth instance
import { syncRepos } from "@/lib/sync";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  await syncRepos(userId, { force: true });
  return NextResponse.json({ ok: true });
}