/**
 * @file src/features/blogs/components/blocks/ImageBlock.tsx
 * @purpose Renders responsive images with required alt text and optional caption.
 * @tags blogs, blocks, image, responsive
 */
import React from "react";
import Image from "next/image";
import type { ImageBlock as BlockType } from "@/types/block";

export function ImageBlock({ block }: { block: BlockType }) {
  return (
    <figure className="my-6">
      <div className="relative overflow-hidden rounded border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <Image
          src={block.url}
          alt={block.alt}
          width={block.width || 800}
          height={block.height || 450}
          className="w-full h-auto object-cover"
        />
      </div>
      {block.caption && (
        <figcaption className="mt-2 text-center text-xs text-secondary-light dark:text-secondary-dark">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
