/**
 * @file src/features/blogs/components/blocks/SubtitleBlock.tsx
 * @purpose Renders h2 or h3 heading blocks with anchor links for TOC.
 * @tags blogs, blocks, subtitle, headings
 */
import React from "react";
import type { SubtitleBlock as BlockType } from "@/types/block";

export function SubtitleBlock({ block }: { block: BlockType }) {
  const Tag = block.level === 3 ? "h3" : "h2";
  const classes =
    block.level === 3
      ? "text-xl font-bold mt-6 mb-3 text-text-light dark:text-text-dark"
      : "text-2xl font-bold mt-8 mb-4 text-text-light dark:text-text-dark";

  return (
    <Tag id={block.id} className={classes}>
      <a href={`#${block.id}`} className="hover:underline">
        {block.text}
      </a>
    </Tag>
  );
}
