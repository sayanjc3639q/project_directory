/**
 * @file src/features/search/lib/rankResults.ts
 * @purpose Ranks search results by relevance score and limits output count.
 * @tags search, rank, results, sorting
 */
import type { SearchIndexItem, SearchResultItem } from "@/types/search";
import { fuzzyMatchItem } from "./fuzzyMatch";

export function rankSearchResults(
  items: SearchIndexItem[],
  query: string,
  limit: number = 8
): SearchResultItem[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const tokens = cleanQuery.split(/\s+/).filter(Boolean);
  const matched: SearchResultItem[] = [];

  for (const item of items) {
    const res = fuzzyMatchItem(item, tokens);
    if (res) {
      matched.push(res);
    }
  }

  matched.sort((a, b) => b.score - a.score);
  return matched.slice(0, limit);
}
