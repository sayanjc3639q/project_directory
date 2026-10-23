/**
 * @file src/features/search/index.ts
 * @purpose Public feature exports for search bar, index, and matching utilities.
 * @tags search, barrel, exports
 */
export { SearchBar } from "./components/SearchBar";
export { SearchSuggestions } from "./components/SearchSuggestions";

export { rankSearchResults } from "./lib/rankResults";
export { fuzzyMatchItem } from "./lib/fuzzyMatch";
export { useSearchIndex } from "./hooks/useSearchIndex";
export { useSearchShortcut } from "./hooks/useSearchShortcut";
