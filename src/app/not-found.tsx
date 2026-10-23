/**
 * @file src/app/not-found.tsx
 * @purpose Root not found error boundary page for non-existent routes.
 * @tags not-found, 404, error, page
 */
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
      <p className="text-sm text-secondary-light dark:text-secondary-dark">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="pt-2">
        <Link href="/">
          <Button size="sm">Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
