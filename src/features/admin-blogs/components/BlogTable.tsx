/**
 * @file src/features/admin-blogs/components/BlogTable.tsx
 * @purpose Admin table listing blogs with status badges, edit, duplicate, and delete actions.
 * @tags admin, blog, table, list, actions
 */
"use client";

import React from "react";
import Link from "next/link";
import type { BlogSummary } from "@/types/blog";
import { deleteBlogAction } from "../server/deleteBlog.action";
import { duplicateBlogAction } from "../server/duplicateBlog.action";

export function BlogTable({ blogs }: { blogs: BlogSummary[] }) {
  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete blog "${title}"?`)) return;
    const res = await deleteBlogAction(id);
    if (res.success) {
      window.location.reload();
    } else {
      alert(res.error);
    }
  }

  async function handleDuplicate(id: string) {
    const res = await duplicateBlogAction(id);
    if (res.success) {
      window.location.reload();
    } else {
      alert(res.error);
    }
  }

  if (blogs.length === 0) {
    return (
      <div className="p-8 border border-dashed border-border-light dark:border-border-dark rounded text-center text-xs text-secondary-light">
        No blogs found. Click "+ Create Blog" to write your first article.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-border-light dark:border-border-dark rounded">
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
          <tr>
            <th className="py-2.5 px-4 font-semibold">Title</th>
            <th className="py-2.5 px-4 font-semibold">Topic Path</th>
            <th className="py-2.5 px-4 font-semibold">Published</th>
            <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-light dark:divide-border-dark">
          {blogs.map((b) => (
            <tr key={b.id} className="hover:bg-surface-light dark:hover:bg-surface-dark">
              <td className="py-2.5 px-4 font-medium text-text-light dark:text-text-dark">
                <Link href={`/admin/blogs/${b.id}/edit`} className="hover:underline">
                  {b.title}
                </Link>
              </td>
              <td className="py-2.5 px-4 text-secondary-light dark:text-secondary-dark">
                {b.topicPathKey}
              </td>
              <td className="py-2.5 px-4 text-secondary-light dark:text-secondary-dark">
                {new Date(b.publishedAt).toLocaleDateString()}
              </td>
              <td className="py-2.5 px-4 text-right space-x-2">
                <button
                  type="button"
                  onClick={() => handleDuplicate(b.id)}
                  className="hover:underline text-secondary-light"
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(b.id, b.title)}
                  className="hover:underline text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
