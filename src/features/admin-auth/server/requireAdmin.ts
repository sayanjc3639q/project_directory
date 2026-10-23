/**
 * @file src/features/admin-auth/server/requireAdmin.ts
 * @purpose Strict server guard enforcing authenticated admin session for layouts and actions.
 * @tags auth, admin, guard, requireAdmin, security
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionCookie } from "./verifySession";
import type { SessionPayload } from "@/types/api";

const SESSION_COOKIE = process.env.SESSION_COOKIE_NAME || "bilbili_session";

export async function requireAdmin(redirectOnFail: boolean = true): Promise<SessionPayload> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    if (redirectOnFail) {
      redirect("/admin/login");
    }
    throw new Error("Unauthorized: Missing session cookie");
  }

  const payload = await verifySessionCookie(sessionCookie);

  if (!payload || !payload.admin) {
    if (redirectOnFail) {
      redirect("/admin/login");
    }
    throw new Error("Forbidden: Admin custom claim required");
  }

  return payload;
}
