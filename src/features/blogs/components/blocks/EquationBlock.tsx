/**
 * @file src/features/blogs/components/blocks/EquationBlock.tsx
 * @purpose Renders LaTeX mathematical equations dynamically using KaTeX.
 * @tags blogs, blocks, equation, katex, math
 */
import React from "react";
import katex from "katex";
import type { EquationBlock as BlockType } from "@/types/block";

export function EquationBlock({ block }: { block: BlockType }) {
  const html = katex.renderToString(block.latex, {
    displayMode: block.display ?? true,
    throwOnError: false,
  });

  return (
    <div
      className="my-5 overflow-x-auto text-center py-2 text-text-light dark:text-text-dark"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
