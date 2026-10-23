/**
 * @file src/types/search.ts
 * @purpose Types for client-side search index items and queries.
 * @tags types, search, index, fuzzy
 */

export interface SearchIndexItem {
  title: string;
  slug: string;
  pathLabel: string;
  keywords: string[];
  excerpt: string;
}

export interface SearchResultItem extends SearchIndexItem {
  score: number;
}
