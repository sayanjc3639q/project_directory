/**
 * @file src/features/blogs/blogs.test.ts
 * @purpose Unit tests for blog reading time, heading extraction, and plain text conversions.
 * @tags test, blogs, reading-time, headings, vitest
 */
import { describe, it, expect } from "vitest";
import { calculateReadingTime } from "./lib/readingTime";
import { extractHeadings } from "./lib/extractHeadings";
import { blocksToPlainText } from "./lib/blocksToPlainText";
import { parseInline } from "./lib/parseInline";
import type { Block } from "@/types/block";

describe("Blog Utilities", () => {
  it("calculates reading time from word counts", () => {
    const text = new Array(400).fill("word").join(" ");
    expect(calculateReadingTime(text)).toBe(2);
    expect(calculateReadingTime("short sentence")).toBe(1);
  });

  it("extracts subtitle blocks as heading items", () => {
    const blocks: Block[] = [
      { id: "h1", type: "subtitle", level: 2, text: "Section One" },
      { id: "p1", type: "paragraph", text: "Text here" },
      { id: "h2", type: "subtitle", level: 3, text: "Sub Section" },
    ];

    const headings = extractHeadings(blocks);
    expect(headings).toHaveLength(2);
    expect(headings[0]?.text).toBe("Section One");
    expect(headings[1]?.level).toBe(3);
  });

  it("extracts plain text across mixed block types", () => {
    const blocks: Block[] = [
      { id: "p1", type: "paragraph", text: "Hello" },
      { id: "l1", type: "bulletList", items: ["Item 1", "Item 2"] },
    ];
    const text = blocksToPlainText(blocks);
    expect(text).toContain("Hello");
    expect(text).toContain("Item 1 Item 2");
  });

  it("parses inline links and bold text safely", () => {
    const nodes = parseInline("This is **important** and [link](https://example.com)");
    expect(nodes.length).toBeGreaterThan(1);
  });
});
