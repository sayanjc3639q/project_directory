/**
 * @file src/features/blogs/components/blocks/ParagraphBlock.tsx
 * @purpose Renders paragraph text blocks with parsed inline syntax.
 * @tags blogs, blocks, paragraph, typography
 */
import React from "react";
import type { ParagraphBlock as BlockType } from "@/types/block";
import { parseInline } from "../../lib/parseInline";

export function ParagraphBlock({ block }: { block: BlockType }) {
  return (
    <p className="mb-5 leading-relaxed text-text-light dark:text-text-dark">
      {parseInline(block.text)}
    </p>
  );
}
