/**
 * @file src/features/blogs/components/blocks/CalloutBlock.tsx
 * @purpose Renders solid callout message cards for notes and warnings.
 * @tags blogs, blocks, callout, warning, note
 */
import React from "react";
import type { CalloutBlock as BlockType } from "@/types/block";
import { parseInline } from "../../lib/parseInline";

export function CalloutBlock({ block }: { block: BlockType }) {
  const isWarning = block.variant === "warning";
  const borderStyle = isWarning
    ? "border-l-4 border-yellow-600 bg-callout-warning text-black dark:text-yellow-100"
    : "border-l-4 border-accent bg-callout-note text-black dark:text-blue-100";

  return (
    <aside className={`p-4 my-5 rounded-r text-sm leading-relaxed ${borderStyle}`}>
      <div className="font-semibold uppercase tracking-wider text-xs mb-1 opacity-80">
        {block.variant}
      </div>
      <div>{parseInline(block.text)}</div>
    </aside>
  );
}
