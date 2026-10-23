/**
 * @file src/features/admin-topics/components/TopicForm.tsx
 * @purpose Form component for creating main topics and nested subtopics.
 * @tags admin, topics, form, create
 */
"use client";

import React, { useState } from "react";
import { createTopicAction } from "../server/createTopic.action";
import { Button } from "@/components/ui/Button";

export function TopicForm({
  parentId,
  parentName,
  onSuccess,
  onCancel,
}: {
  parentId?: string | null;
  parentName?: string;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleNameChange(val: string) {
    setName(val);
    const autoSlug = val
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(autoSlug);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await createTopicAction({ name, slug, parentId });
    setLoading(false);

    if (res.success) {
      onSuccess();
    } else {
      setError(res.error || "Failed to create topic");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark space-y-3">
      <h3 className="font-bold text-sm">
        {parentId ? `Add Subtopic to: ${parentName}` : "Create Main Topic"}
      </h3>
      {error && <div className="text-xs text-red-600 dark:text-red-400">{error}</div>}
      <div>
        <label className="block text-xs font-semibold uppercase mb-1">Name</label>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full px-3 py-1.5 text-xs border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark"
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase mb-1">Slug</label>
        <input
          required
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-3 py-1.5 text-xs border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark font-mono"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Creating..." : "Save Topic"}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
