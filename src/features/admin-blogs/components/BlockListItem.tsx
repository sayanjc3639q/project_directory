/**
 * @file src/features/admin-blogs/components/BlockListItem.tsx
 * @purpose Renders single editable block entry with delete, move, and content controls.
 * @tags admin, blog, editor, block, item
 */
"use client";

import React from "react";
import type { Block } from "@/types/block";

export interface BlockListItemProps {
  block: Block;
  index: number;
  onUpdate: (updated: Block) => void;
  onRemove: () => void;
}

export function BlockListItem({
  block,
  index,
  onUpdate,
  onRemove,
}: BlockListItemProps) {
  return (
    <div className="p-3 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark space-y-2">
      <div className="flex items-center justify-between text-xs text-secondary-light">
        <span className="font-semibold uppercase">#{index + 1} {block.type}</span>
        <button
          type="button"
          onClick={onRemove}
          className="text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>

      {block.type === "subtitle" && (
        <input
          type="text"
          value={block.text}
          onChange={(e) => onUpdate({ ...block, text: e.target.value })}
          placeholder="Subtitle heading text"
          className="w-full px-2.5 py-1.5 text-sm border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark"
        />
      )}

      {block.type === "paragraph" && (
        <textarea
          rows={3}
          value={block.text}
          onChange={(e) => onUpdate({ ...block, text: e.target.value })}
          placeholder="Paragraph markdown text (**bold**, *italic*, [label](url))"
          className="w-full px-2.5 py-1.5 text-sm border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark"
        />
      )}

      {block.type === "code" && (
        <textarea
          rows={4}
          value={block.code}
          onChange={(e) => onUpdate({ ...block, code: e.target.value })}
          placeholder="Paste code snippet"
          className="w-full font-mono text-xs px-2.5 py-1.5 border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark"
        />
      )}
    </div>
  );
}
