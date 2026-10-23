/**
 * @file src/features/blogs/components/BlogBody.tsx
 * @purpose Renders full sequence of blog content blocks inside a reading column.
 * @tags blogs, body, blocks, reader
 */
import React from "react";
import type { Block } from "@/types/block";
import { BlockRenderer } from "./blocks/BlockRenderer";

export function BlogBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-article">
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}
