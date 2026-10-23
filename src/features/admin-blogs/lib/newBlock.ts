/**
 * @file src/features/admin-blogs/lib/newBlock.ts
 * @purpose Factory creating new default block instances with unique IDs.
 * @tags admin, blog, blocks, factory
 */
import type { Block } from "@/types/block";

export function createNewBlock(type: Block["type"]): Block {
  const id = `block_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  switch (type) {
    case "subtitle":
      return { id, type: "subtitle", level: 2, text: "" };
    case "paragraph":
      return { id, type: "paragraph", text: "" };
    case "bulletList":
      return { id, type: "bulletList", items: [""] };
    case "numberedList":
      return { id, type: "numberedList", items: [""] };
    case "table":
      return { id, type: "table", headers: ["Column 1", "Column 2"], rows: [["", ""]] };
    case "image":
      return { id, type: "image", url: "", alt: "" };
    case "code":
      return { id, type: "code", language: "typescript", code: "" };
    case "callout":
      return { id, type: "callout", variant: "note", text: "" };
    case "equation":
      return { id, type: "equation", latex: "", display: true };
  }
}
