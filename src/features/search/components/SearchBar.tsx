/**
 * @file src/features/search/components/SearchBar.tsx
 * @purpose Search input with lazy index fetch, fuzzy results, and suggestion navigation.
 * @tags search, bar, input, fuzzy, keyboard
 */
"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchIndex } from "../hooks/useSearchIndex";
import { useSearchShortcut } from "../hooks/useSearchShortcut";
import { rankSearchResults } from "../lib/rankResults";
import { SearchSuggestions } from "./SearchSuggestions";
import type { SearchResultItem } from "@/types/search";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { index, fetchIndex } = useSearchIndex();

  useSearchShortcut(() => inputRef.current?.focus());

  async function handleChange(val: string) {
    setQuery(val);
    setActiveIndex(-1);
    if (!val.trim()) {
      setResults([]);
      return;
    }

    const corpus = index || (await fetchIndex());
    const ranked = rankSearchResults(corpus, val, 6);
    setResults(ranked);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && results[activeIndex]) {
        e.preventDefault();
        router.push(`/blog/${results[activeIndex].slug}`);
        setResults([]);
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
        setResults([]);
      }
    }
  }

  return (
    <div className="relative w-full max-w-xs">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onFocus={() => fetchIndex()}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search articles... (/)"
        className="w-full px-3 py-1.5 text-xs border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark focus:outline-accent"
      />
      <SearchSuggestions
        results={results}
        activeIndex={activeIndex}
        onSelect={() => setResults([])}
      />
    </div>
  );
}
