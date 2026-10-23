/**
 * @file src/features/blogs/components/PrevNextLinks.tsx
 * @purpose Renders previous and next blog navigation links within the same subtopic.
 * @tags blogs, pagination, navigation, prev-next
 */
import React from "react";
import Link from "next/link";
import type { BlogSummary } from "@/types/blog";

export interface PrevNextProps {
  prev: BlogSummary | null;
  next: BlogSummary | null;
}

export function PrevNextLinks({ prev, next }: PrevNextProps) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Previous and Next Articles" className="mt-10 pt-6 border-t border-border-light dark:border-border-dark grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="p-4 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark hover:border-accent text-left"
        >
          <div className="text-[10px] uppercase font-semibold text-secondary-light dark:text-secondary-dark mb-1">
            Previous Article
          </div>
          <div className="text-sm font-medium text-text-light dark:text-text-dark line-clamp-1">
            {prev.title}
          </div>
        </Link>
      ) : <div />}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="p-4 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark hover:border-accent text-right"
        >
          <div className="text-[10px] uppercase font-semibold text-secondary-light dark:text-secondary-dark mb-1">
            Next Article
          </div>
          <div className="text-sm font-medium text-text-light dark:text-text-dark line-clamp-1">
            {next.title}
          </div>
        </Link>
      ) : <div />}
    </nav>
  );
}
