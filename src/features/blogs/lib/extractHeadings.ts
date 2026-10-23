/**
 * @file src/features/blogs/lib/extractHeadings.ts
 * @purpose Extracts subtitle blocks to generate table of contents items.
 * @tags blogs, headings, toc, subtitles
 */
import type { Block, SubtitleBlock } from "@/types/block";

export interface HeadingItem {
  id: string;
  level: 2 | 3;
  text: string;
}

export function extractHeadings(blocks: Block[]): HeadingItem[] {
  return blocks
    .filter((b): b is SubtitleBlock => b.type === "subtitle")
    .map((b) => ({
      id: b.id,
      level: b.level,
      text: b.text,
    }));
}
