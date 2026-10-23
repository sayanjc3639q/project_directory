/**
 * @file src/features/admin-blogs/components/BlockList.tsx
 * @purpose Ordered list of content blocks with add, update, and remove actions.
 * @tags admin, blog, editor, blocks, list
 */
"use client";

import React from "react";
import type { Block } from "@/types/block";
import { BlockListItem } from "./BlockListItem";
import { createNewBlock } from "../lib/newBlock";

export interface BlockListProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}

export function BlockList({ blocks, onChange }: BlockListProps) {
  function handleAdd(type: Block["type"]) {
    onChange([...blocks, createNewBlock(type)]);
  }

  function handleUpdate(index: number, updated: Block) {
    const next = [...blocks];
    next[index] = updated;
    onChange(next);
  }

  function handleRemove(index: number) {
    onChange(blocks.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase">Content Blocks</label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => handleAdd("paragraph")}
            className="text-[11px] px-2 py-1 rounded border border-border-light dark:border-border-dark hover:bg-surface-light"
          >
            + Paragraph
          </button>
          <button
            type="button"
            onClick={() => handleAdd("subtitle")}
            className="text-[11px] px-2 py-1 rounded border border-border-light dark:border-border-dark hover:bg-surface-light"
          >
            + Subtitle
          </button>
          <button
            type="button"
            onClick={() => handleAdd("code")}
            className="text-[11px] px-2 py-1 rounded border border-border-light dark:border-border-dark hover:bg-surface-light"
          >
            + Code
          </button>
        </div>
      </div>

      {blocks.length === 0 ? (
        <div className="p-4 border border-dashed border-border-light dark:border-border-dark rounded text-xs text-secondary-light text-center">
          No blocks added yet. Click above to add content.
        </div>
      ) : (
        blocks.map((block, idx) => (
          <BlockListItem
            key={block.id}
            block={block}
            index={idx}
            onUpdate={(u) => handleUpdate(idx, u)}
            onRemove={() => handleRemove(idx)}
          />
        ))
      )}
    </div>
  );
}
