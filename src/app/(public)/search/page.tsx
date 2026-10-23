/**
 * @file src/app/(public)/search/page.tsx
 * @purpose Search results page executing client-side query matching against the search index.
 * @tags search, page, results, client
 */
"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useSearchIndex } from "@/features/search";
import { rankSearchResults } from "@/features/search";
import type { SearchResultItem } from "@/types/search";

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const { index, fetchIndex, loading } = useSearchIndex();
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    async function load() {
      const corpus = index || (await fetchIndex());
      if (q) {
        setResults(rankSearchResults(corpus, q, 30));
      } else {
        setResults([]);
      }
    }
    load();
  }, [q, index, fetchIndex]);

  return (
    <div className="max-w-reading mx-auto py-4">
      <h1 className="text-2xl font-bold mb-4">
        {q ? `Search results for "${q}"` : "Search"}
      </h1>

      {loading && <div className="text-xs text-secondary-light">Loading index...</div>}

      {!loading && q && results.length === 0 && (
        <div className="p-8 border border-dashed border-border-light dark:border-border-dark rounded text-center text-xs text-secondary-light">
          No matching articles found. Try different keywords.
        </div>
      )}

      <div className="space-y-4">
        {results.map((r) => (
          <article key={r.slug} className="p-4 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark">
            <Link href={`/blog/${r.slug}`} className="font-semibold text-base hover:underline text-accent">
              {r.title}
            </Link>
            <div className="text-xs text-secondary-light dark:text-secondary-dark mt-1">
              {r.pathLabel}
            </div>
            <p className="text-xs text-text-light dark:text-text-dark mt-2 line-clamp-2">
              {r.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-sm">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
