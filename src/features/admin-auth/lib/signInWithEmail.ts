/**
 * @file src/features/admin-auth/lib/signInWithEmail.ts
 * @purpose Client helper signing in via Firebase Auth and creating server session.
 * @tags auth, login, firebase, client, admin
 */
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getClientAuth } from "@/lib/firebase/client-auth";

async function createSessionFromToken(idToken: string): Promise<void> {
  const res = await fetch("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to establish admin session");
  }
}

export async function adminSignIn(email: string, pass: string): Promise<void> {
  const auth = getClientAuth();
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  const idToken = await userCredential.user.getIdToken();
  await createSessionFromToken(idToken);
}

export async function adminSignInWithGoogle(): Promise<void> {
  const auth = getClientAuth();
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const idToken = await userCredential.user.getIdToken();
  await createSessionFromToken(idToken);
}

export async function adminSignOut(): Promise<void> {
  await fetch("/api/session", { method: "DELETE" });
  const auth = getClientAuth();
  await auth.signOut();
}
