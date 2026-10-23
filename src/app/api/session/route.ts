/**
 * @file src/app/api/session/route.ts
 * @purpose API route creating or clearing HTTP-only secure admin session cookies.
 * @tags api, session, auth, cookie, route
 */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createAdminSessionCookie } from "@/features/admin-auth/server/createSession";

const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME || "bilbili_session";
const FIVE_DAYS_SECONDS = 60 * 60 * 24 * 5;

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    if (!idToken) {
      return NextResponse.json({ error: "idToken is required" }, { status: 400 });
    }

    const sessionCookie = await createAdminSessionCookie(idToken);
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE, sessionCookie, {
      maxAge: FIVE_DAYS_SECONDS,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ success: true });
}
