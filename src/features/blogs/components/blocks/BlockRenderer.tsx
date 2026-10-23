/**
 * @file src/features/blogs/components/blocks/BlockRenderer.tsx
 * @purpose Dispatches content blocks to their specific visual renderers.
 * @tags blogs, blocks, renderer, dispatch
 */
import React from "react";
import type { Block } from "@/types/block";
import { SubtitleBlock } from "./SubtitleBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import { BulletListBlock } from "./BulletListBlock";
import { NumberedListBlock } from "./NumberedListBlock";
import { TableBlock } from "./TableBlock";
import { ImageBlock } from "./ImageBlock";
import { CodeBlock } from "./CodeBlock";
import { CalloutBlock } from "./CalloutBlock";
import { EquationBlock } from "./EquationBlock";

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "subtitle":
      return <SubtitleBlock block={block} />;
    case "paragraph":
      return <ParagraphBlock block={block} />;
    case "bulletList":
      return <BulletListBlock block={block} />;
    case "numberedList":
      return <NumberedListBlock block={block} />;
    case "table":
      return <TableBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "code":
      return <CodeBlock block={block} />;
    case "callout":
      return <CalloutBlock block={block} />;
    case "equation":
      return <EquationBlock block={block} />;
    default:
      return null;
  }
}
