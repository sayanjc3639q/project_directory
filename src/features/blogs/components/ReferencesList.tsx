/**
 * @file src/features/blogs/components/ReferencesList.tsx
 * @purpose Renders numbered reference links and citations at the end of an article.
 * @tags blogs, references, citations, links
 */
import React from "react";
import type { BlogReference } from "@/types/blog";

export function ReferencesList({ references }: { references: BlogReference[] }) {
  if (!references || references.length === 0) return null;

  return (
    <section className="mt-10 pt-6 border-t border-border-light dark:border-border-dark">
      <h2 className="text-lg font-bold text-text-light dark:text-text-dark mb-3">
        References & Citations
      </h2>
      <ol className="list-decimal pl-5 space-y-1 text-xs text-secondary-light dark:text-secondary-dark">
        {references.map((ref, idx) => (
          <li key={idx}>
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-accent-hover"
            >
              {ref.label}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
