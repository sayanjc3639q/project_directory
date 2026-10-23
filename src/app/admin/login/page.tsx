/**
 * @file src/app/admin/login/page.tsx
 * @purpose Admin login screen rendering credentials form.
 * @tags admin, login, auth, page
 */
import React, { Suspense } from "react";
import { LoginForm } from "@/features/admin-auth";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm mb-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Bilbili Admin</h1>
        <p className="text-xs text-secondary-light dark:text-secondary-dark mt-1">
          Enter admin credentials to manage content
        </p>
      </div>
      <Suspense fallback={<div className="text-sm">Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
