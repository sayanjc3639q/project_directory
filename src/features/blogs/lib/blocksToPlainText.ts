/**
 * @file src/features/blogs/lib/blocksToPlainText.ts
 * @purpose Converts structured content blocks into searchable plain text.
 * @tags blogs, blocks, text, search, excerpt
 */
import type { Block } from "@/types/block";

export function blocksToPlainText(blocks: Block[]): string {
  const parts: string[] = [];

  for (const block of blocks) {
    switch (block.type) {
      case "subtitle":
      case "paragraph":
        parts.push(block.text);
        break;
      case "bulletList":
      case "numberedList":
        parts.push(block.items.join(" "));
        break;
      case "callout":
        parts.push(block.text);
        break;
      case "table":
        if (block.headers) parts.push(block.headers.join(" "));
        for (const row of block.rows) {
          parts.push(row.join(" "));
        }
        break;
      case "code":
        parts.push(block.code);
        break;
      default:
        break;
    }
  }

  return parts.join(" ");
}
