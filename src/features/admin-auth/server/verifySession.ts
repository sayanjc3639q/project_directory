/**
 * @file src/features/admin-auth/server/verifySession.ts
 * @purpose Verifies session cookie cryptographically and validates admin custom claims.
 * @tags auth, admin, session, verification, token
 */
import { getAdminAuth } from "@/lib/firebase/admin-db";
import type { SessionPayload } from "@/types/api";

export async function verifySessionCookie(sessionCookie: string): Promise<SessionPayload | null> {
  try {
    const auth = getAdminAuth();
    const decoded = await auth.verifySessionCookie(sessionCookie, true);
    if (!decoded || !decoded.admin) {
      return null;
    }

    return {
      uid: decoded.uid,
      email: decoded.email,
      admin: Boolean(decoded.admin),
    };
  } catch {
    return null;
  }
}
