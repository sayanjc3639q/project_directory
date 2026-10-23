/**
 * @file src/app/admin/(protected)/blogs/[id]/edit/page.tsx
 * @purpose Admin page editing existing blog article.
 * @tags admin, blog, edit, page
 */
import React from "react";
import { BlogEditor } from "@/features/admin-blogs";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;

  return (
    <div className="py-6">
      <div className="max-w-3xl mx-auto mb-6">
        <h1 className="text-2xl font-bold">Edit Blog Article</h1>
      </div>
      <BlogEditor initialId={id} />
    </div>
  );
}
