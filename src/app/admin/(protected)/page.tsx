/**
 * @file src/app/admin/(protected)/page.tsx
 * @purpose Admin dashboard home view showing quick statistics and management links.
 * @tags admin, dashboard, statistics, page
 */
import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function AdminDashboardPage() {
  return (
    <Container>
      <h1 className="text-2xl font-bold tracking-tight mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/topics"
          className="p-6 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark hover:border-accent"
        >
          <h2 className="text-lg font-semibold mb-2">Topic Hierarchy</h2>
          <p className="text-xs text-secondary-light dark:text-secondary-dark">
            Manage main topics, nested subtopics, and copy private IDs.
          </p>
        </Link>
        <Link
          href="/admin/blogs"
          className="p-6 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark hover:border-accent"
        >
          <h2 className="text-lg font-semibold mb-2">Blog Articles</h2>
          <p className="text-xs text-secondary-light dark:text-secondary-dark">
            Draft, edit blocks, upload images, and publish blog articles.
          </p>
        </Link>
      </div>
    </Container>
  );
}
