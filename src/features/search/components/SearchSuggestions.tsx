/**
 * @file src/features/search/components/SearchSuggestions.tsx
 * @purpose Renders instant search drop-down suggestions navigable via arrow keys.
 * @tags search, suggestions, dropdown, keyboard
 */
"use client";

import React from "react";
import Link from "next/link";
import type { SearchResultItem } from "@/types/search";

export interface SearchSuggestionsProps {
  results: SearchResultItem[];
  activeIndex: number;
  onSelect: () => void;
}

export function SearchSuggestions({
  results,
  activeIndex,
  onSelect,
}: SearchSuggestionsProps) {
  if (results.length === 0) return null;

  return (
    <ul className="absolute top-full left-0 right-0 mt-1 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark shadow-none z-50 overflow-hidden divide-y divide-border-light dark:divide-border-dark">
      {results.map((item, idx) => {
        const isSelected = activeIndex === idx;
        return (
          <li key={item.slug}>
            <Link
              href={`/blog/${item.slug}`}
              onClick={onSelect}
              className={`block px-4 py-2.5 text-xs transition-colors ${
                isSelected
                  ? "bg-accent text-white"
                  : "text-text-light dark:text-text-dark hover:bg-border-light dark:hover:bg-border-dark"
              }`}
            >
              <div className="font-semibold line-clamp-1">{item.title}</div>
              <div className="text-[10px] opacity-75 line-clamp-1">{item.pathLabel}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
