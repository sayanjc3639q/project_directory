/**
 * @file src/features/blogs/components/blocks/BulletListBlock.tsx
 * @purpose Renders unordered bulleted list blocks.
 * @tags blogs, blocks, list, bullets
 */
import React from "react";
import type { BulletListBlock as BlockType } from "@/types/block";
import { parseInline } from "../../lib/parseInline";

export function BulletListBlock({ block }: { block: BlockType }) {
  return (
    <ul className="list-disc pl-6 mb-5 space-y-1.5 text-text-light dark:text-text-dark">
      {block.items.map((item, idx) => (
        <li key={idx}>{parseInline(item)}</li>
      ))}
    </ul>
  );
}
