/**
 * @file src/features/toc/components/TableOfContents.tsx
 * @purpose Sticky table of contents list with active heading highlight.
 * @tags toc, headings, sticky, scroll-spy
 */
"use client";

import React from "react";
import type { HeadingItem } from "@/features/blogs/lib/extractHeadings";
import { useScrollSpy } from "../hooks/useScrollSpy";

export function TableOfContents({ headings }: { headings: HeadingItem[] }) {
  const activeId = useScrollSpy(headings.map((h) => h.id));

  if (!headings || headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block w-[220px] flex-shrink-0 sticky top-24 self-start text-xs border-l border-border-light dark:border-border-dark pl-4 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <div className="font-semibold uppercase tracking-wider text-secondary-light dark:text-secondary-dark mb-3">
        On This Page
      </div>
      <ul className="space-y-2">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li
              key={h.id}
              className={`${h.level === 3 ? "pl-3" : ""} transition-colors`}
            >
              <a
                href={`#${h.id}`}
                className={
                  isActive
                    ? "font-semibold text-accent dark:text-accent-dark"
                    : "text-secondary-light dark:text-secondary-dark hover:text-text-light dark:hover:text-text-dark"
                }
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
