/**
 * @file src/app/(public)/offline/page.tsx
 * @purpose Offline fallback screen when network connection is unavailable.
 * @tags offline, fallback, pwa, network
 */
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function OfflinePage() {
  return (
    <div className="max-w-reading mx-auto py-16 text-center space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">You are offline</h1>
      <p className="text-sm text-secondary-light dark:text-secondary-dark">
        It looks like you have lost connection. You can still access previously visited and saved articles.
      </p>
      <div className="pt-4">
        <Link href="/saved">
          <Button size="sm">View Saved Articles</Button>
        </Link>
      </div>
    </div>
  );
}
