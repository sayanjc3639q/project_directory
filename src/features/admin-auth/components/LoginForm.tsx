/**
 * @file src/features/admin-auth/components/LoginForm.tsx
 * @purpose Admin email and password login form with rate-limiting and error display.
 * @tags auth, login, form, admin, client
 */
"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminSignIn, adminSignInWithGoogle } from "../lib/signInWithEmail";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSignIn(mode: "google" | "email") {
    setError(null);
    setLoading(true);

    try {
      if (mode === "google") {
        await adminSignInWithGoogle();
      } else {
        await adminSignIn(email, password);
      }
      const destination = searchParams.get("from") || "/admin";
      router.push(destination);
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm space-y-4">
      {error && (
        <div className="p-3 text-xs bg-callout-warning border border-yellow-500 rounded text-black">
          {error}
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        onClick={() => handleSignIn("google")}
        className="w-full font-semibold"
      >
        Sign in with Google
      </Button>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
        <span className="text-[11px] text-secondary-light uppercase">or email</span>
        <div className="flex-1 h-px bg-border-light dark:bg-border-dark" />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); handleSignIn("email"); }} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark focus:outline-accent"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark focus:outline-accent"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Signing in..." : "Sign in with Email"}
        </Button>
      </form>
    </div>
  );
}
