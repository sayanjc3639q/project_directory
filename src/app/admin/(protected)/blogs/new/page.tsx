/**
 * @file src/app/admin/(protected)/blogs/new/page.tsx
 * @purpose Admin page creating new blog article.
 * @tags admin, blog, new, page
 */
import React from "react";
import { BlogEditor } from "@/features/admin-blogs";

export default function NewBlogPage() {
  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">New Blog Article</h1>
      </div>
      <BlogEditor />
    </div>
  );
}
