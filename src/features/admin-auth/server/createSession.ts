/**
 * @file src/features/admin-auth/server/createSession.ts
 * @purpose Generates Firebase admin session cookie from a client-provided ID token.
 * @tags auth, admin, session, cookie, token
 */
import { getAdminAuth } from "@/lib/firebase/admin-db";

const FIVE_DAYS_MS = 60 * 60 * 24 * 5 * 1000;

export async function createAdminSessionCookie(idToken: string): Promise<string> {
  const auth = getAdminAuth();
  const decoded = await auth.verifyIdToken(idToken);

  if (!decoded.admin) {
    throw new Error("User does not have admin permissions");
  }

  return auth.createSessionCookie(idToken, {
    expiresIn: FIVE_DAYS_MS,
  });
}
