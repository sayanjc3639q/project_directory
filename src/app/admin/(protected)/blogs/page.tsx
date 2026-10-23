/**
 * @file src/app/admin/(protected)/blogs/page.tsx
 * @purpose Admin blogs list view rendering filter controls and table of articles.
 * @tags admin, blogs, list, page
 */
import React from "react";
import Link from "next/link";
import { getLatestBlogs } from "@/features/blogs";
import { BlogTable } from "@/features/admin-blogs";
import { Button } from "@/components/ui/Button";

export default async function AdminBlogsPage() {
  const blogs = await getLatestBlogs(50);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Articles Manager</h1>
        <Link href="/admin/blogs/new">
          <Button size="sm">+ New Blog</Button>
        </Link>
      </div>
      <BlogTable blogs={blogs} />
    </div>
  );
}
