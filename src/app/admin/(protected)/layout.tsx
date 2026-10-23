/**
 * @file src/app/admin/(protected)/layout.tsx
 * @purpose Protected admin layout verifying session and admin claim via requireAdmin.
 * @tags admin, layout, protected, requireAdmin
 */
import React from "react";
import Link from "next/link";
import { requireAdmin, LogoutButton } from "@/features/admin-auth";
import { Container } from "@/components/ui/Container";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin(true);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3">
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold text-sm">Bilbili Admin</span>
            <nav className="flex items-center gap-4 text-xs">
              <Link href="/admin" className="hover:underline">Dashboard</Link>
              <Link href="/admin/topics" className="hover:underline">Topics</Link>
              <Link href="/admin/blogs" className="hover:underline">Blogs</Link>
            </nav>
          </div>
          <LogoutButton />
        </Container>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
