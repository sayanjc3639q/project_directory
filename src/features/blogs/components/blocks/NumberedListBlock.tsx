/**
 * @file src/features/blogs/components/blocks/NumberedListBlock.tsx
 * @purpose Renders ordered numbered list blocks.
 * @tags blogs, blocks, list, numbers
 */
import React from "react";
import type { NumberedListBlock as BlockType } from "@/types/block";
import { parseInline } from "../../lib/parseInline";

export function NumberedListBlock({ block }: { block: BlockType }) {
  return (
    <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-text-light dark:text-text-dark">
      {block.items.map((item, idx) => (
        <li key={idx}>{parseInline(item)}</li>
      ))}
    </ol>
  );
}
