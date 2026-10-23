/**
 * @file src/features/blogs/components/blocks/TableBlock.tsx
 * @purpose Renders accessible data tables with internal horizontal scroll wrapper.
 * @tags blogs, blocks, table, responsive
 */
import React from "react";
import type { TableBlock as BlockType } from "@/types/block";
import { parseInline } from "../../lib/parseInline";

export function TableBlock({ block }: { block: BlockType }) {
  return (
    <div className="overflow-x-auto my-6 border border-border-light dark:border-border-dark rounded">
      <table className="w-full text-left text-sm border-collapse">
        {block.caption && (
          <caption className="p-2 text-xs text-secondary-light dark:text-secondary-dark text-left">
            {block.caption}
          </caption>
        )}
        {block.headers && block.headers.length > 0 && (
          <thead className="bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
            <tr>
              {block.headers.map((h, i) => (
                <th key={i} className="py-2.5 px-4 font-semibold text-text-light dark:text-text-dark">
                  {parseInline(h)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-border-light dark:divide-border-dark">
          {block.rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-surface-light dark:hover:bg-surface-dark">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="py-2 px-4 text-text-light dark:text-text-dark">
                  {parseInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
