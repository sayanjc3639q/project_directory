/**
 * @file src/features/admin-blogs/components/BlogEditor.tsx
 * @purpose Admin blog editor view coordinating metadata, blocks, and save actions.
 * @tags admin, blog, editor, form, client
 */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { Block } from "@/types/block";
import type { BlogStatus } from "@/types/blog";
import { SubtopicIdField } from "./SubtopicIdField";
import { BlockList } from "./BlockList";
import { SaveBar } from "./SaveBar";
import { saveBlogAction } from "../server/saveBlog.action";

export function BlogEditor({ initialId }: { initialId?: string }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [subtopicId, setSubtopicId] = useState("");
  const [resolvedPath, setResolvedPath] = useState("");
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [status, setStatus] = useState<BlogStatus>("draft");
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(val: string) {
    setTitle(val);
    setDirty(true);
    if (!initialId) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setSlug(autoSlug);
    }
  }

  async function handleSave(newStatus: BlogStatus) {
    setError(null);
    setLoading(true);
    const res = await saveBlogAction(
      {
        title,
        slug,
        subtopicId,
        blocks,
        references: [],
        status: newStatus,
        tags: [],
      },
      initialId
    );
    setLoading(false);

    if (res.success) {
      setDirty(false);
      setStatus(newStatus);
      router.push("/admin/blogs");
      router.refresh();
    } else {
      setError(res.error || "Failed to save blog");
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {error && <div className="p-3 text-xs bg-red-100 text-red-800 rounded">{error}</div>}
      <div>
        <label className="block text-xs font-semibold uppercase mb-1">Title</label>
        <input
          required
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Article title"
          className="w-full px-3 py-2 text-base font-semibold border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase mb-1">Slug</label>
        <input
          required
          type="text"
          value={slug}
          onChange={(e) => { setSlug(e.target.value); setDirty(true); }}
          className="w-full px-3 py-1.5 text-xs font-mono border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark"
        />
      </div>
      <SubtopicIdField
        value={subtopicId}
        resolvedPath={resolvedPath}
        onChange={(id, path) => { setSubtopicId(id); setResolvedPath(path); setDirty(true); }}
      />
      <BlockList
        blocks={blocks}
        onChange={(b) => { setBlocks(b); setDirty(true); }}
      />
      <SaveBar
        dirty={dirty}
        status={status}
        loading={loading}
        onSaveDraft={() => handleSave("draft")}
        onPublish={() => handleSave("published")}
      />
    </div>
  );
}
