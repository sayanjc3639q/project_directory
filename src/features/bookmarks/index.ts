/**
 * @file src/features/bookmarks/index.ts
 * @purpose Public feature exports for bookmarks and recently viewed articles.
 * @tags bookmarks, barrel, exports
 */
export { BookmarkButton } from "./components/BookmarkButton";
export { SavedList } from "./components/SavedList";
export { toggleBookmark, clearBookmarks } from "./store/bookmarksSlice";
export { addRecent, clearRecent } from "./store/recentSlice";
export type { BookmarkItem } from "./store/bookmarksSlice";
export type { RecentItem } from "./store/recentSlice";
