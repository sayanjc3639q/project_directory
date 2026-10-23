/**
 * @file src/features/search/lib/fuzzyMatch.ts
 * @purpose Evaluates relevance score for a search query against title and keywords.
 * @tags search, fuzzy, matching, score
 */
import type { SearchIndexItem, SearchResultItem } from "@/types/search";

export function fuzzyMatchItem(
  item: SearchIndexItem,
  tokens: string[]
): SearchResultItem | null {
  let score = 0;
  const titleLower = item.title.toLowerCase();
  const pathLower = item.pathLabel.toLowerCase();

  for (const token of tokens) {
    if (titleLower.includes(token)) {
      score += titleLower.startsWith(token) ? 10 : 5;
    } else if (item.keywords.some((k) => k.includes(token))) {
      score += 3;
    } else if (pathLower.includes(token)) {
      score += 2;
    } else if (item.excerpt.toLowerCase().includes(token)) {
      score += 1;
    } else {
      return null;
    }
  }

  return { ...item, score };
}
