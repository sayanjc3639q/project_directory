/**
 * @file src/types/block.ts
 * @purpose TypeScript discriminated union definitions for blog block types.
 * @tags types, blog, block, editor
 */

export interface SubtitleBlock {
  id: string;
  type: "subtitle";
  level: 2 | 3;
  text: string;
}

export interface ParagraphBlock {
  id: string;
  type: "paragraph";
  text: string;
}

export interface BulletListBlock {
  id: string;
  type: "bulletList";
  items: string[];
}

export interface NumberedListBlock {
  id: string;
  type: "numberedList";
  items: string[];
}

export interface TableBlock {
  id: string;
  type: "table";
  headers?: string[];
  rows: string[][];
  caption?: string;
}

export interface ImageBlock {
  id: string;
  type: "image";
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface CodeBlock {
  id: string;
  type: "code";
  language: string;
  code: string;
  filename?: string;
}

export interface CalloutBlock {
  id: string;
  type: "callout";
  variant: "note" | "warning";
  text: string;
}

export interface EquationBlock {
  id: string;
  type: "equation";
  latex: string;
  display?: boolean;
}

export type Block =
  | SubtitleBlock
  | ParagraphBlock
  | BulletListBlock
  | NumberedListBlock
  | TableBlock
  | ImageBlock
  | CodeBlock
  | CalloutBlock
  | EquationBlock;
