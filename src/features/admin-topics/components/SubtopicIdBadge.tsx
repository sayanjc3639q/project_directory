/**
 * @file src/features/admin-topics/components/SubtopicIdBadge.tsx
 * @purpose Admin component rendering 6-char private subtopic ID with clipboard copy.
 * @tags admin, topics, id, clipboard, copy
 */
"use client";

import React, { useState } from "react";

export function SubtopicIdBadge({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark font-mono text-[11px]">
      <span className="text-secondary-light dark:text-secondary-dark font-sans text-[10px]">ID:</span>
      <span className="font-semibold">{id}</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy subtopic ID"
        className="ml-1 text-[10px] px-1.5 py-0.5 rounded border border-border-light dark:border-border-dark hover:bg-border-light dark:hover:bg-border-dark text-text-light dark:text-text-dark"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
