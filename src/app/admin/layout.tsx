/**
 * @file src/app/admin/layout.tsx
 * @purpose Admin layout establishing noindex robots metadata and mounting AdminStoreProvider.
 * @tags admin, layout, provider, noindex
 */
import type { Metadata } from "next";
import React from "react";
import { AdminStoreProvider } from "@/store/AdminStoreProvider";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminStoreProvider>
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark">
        {children}
      </div>
    </AdminStoreProvider>
  );
}
