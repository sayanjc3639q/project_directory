/**
 * @file src/features/search/hooks/useSearchIndex.ts
 * @purpose Client hook lazily fetching the search index on demand with caching.
 * @tags search, hook, index, cache, fetch
 */
"use client";

import { useState, useCallback } from "react";
import type { SearchIndexItem } from "@/types/search";

let cachedIndex: SearchIndexItem[] | null = null;

export function useSearchIndex() {
  const [index, setIndex] = useState<SearchIndexItem[] | null>(cachedIndex);
  const [loading, setLoading] = useState(false);

  const fetchIndex = useCallback(async () => {
    if (cachedIndex) {
      setIndex(cachedIndex);
      return cachedIndex;
    }

    setLoading(true);
    try {
      const res = await fetch("/search-index.json");
      const data: SearchIndexItem[] = await res.json();
      cachedIndex = data;
      setIndex(data);
      return data;
    } catch {
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { index, loading, fetchIndex };
}
