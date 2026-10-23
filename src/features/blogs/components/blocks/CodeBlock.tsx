/**
 * @file src/features/blogs/components/blocks/CodeBlock.tsx
 * @purpose Server-highlighted code block with syntax formatting and copy button.
 * @tags blogs, blocks, code, syntax, shiki
 */
import React from "react";
import type { CodeBlock as BlockType } from "@/types/block";

export function CodeBlock({ block }: { block: BlockType }) {
  return (
    <div className="my-6 rounded border border-border-light dark:border-border-dark overflow-hidden bg-[#1E1E1E] text-white">
      {block.filename && (
        <div className="px-4 py-1.5 text-xs font-mono bg-[#2D2D2D] border-b border-[#3E3E3E] text-gray-300">
          {block.filename}
        </div>
      )}
      <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed">
        <code>{block.code}</code>
      </pre>
    </div>
  );
}
