# Redux State Map

Client-side Redux Architecture for Bilbili.

| Slice | Store | State Shape | Persisted | Key Actions | Primary Readers / Writers |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `theme` | Public | `{ mode: "light" \| "dark" \| "system" }` | Yes (localStorage, debounced 300ms) | `setTheme` | `ThemeToggle.tsx` |
| `bookmarks` | Public | `{ items: [{ slug, title, pathLabel, savedAt }] }` | Yes (localStorage) | `toggleBookmark`, `clearBookmarks` | `BookmarkButton.tsx`, `SavedList.tsx` |
| `recent` | Public | `{ items: Array<{ slug, title, pathLabel, visitedAt }> }` | Yes (max 20) | `addRecent`, `clearRecent` | `RecentlyViewed.tsx` |
| `search` | Public | `{ query, isOpen, activeIndex, indexStatus }` | No | `setQuery`, `setOpen`, `setActiveIndex` | `SearchBar.tsx`, `SearchSuggestions.tsx` |
| `adminTopics` | Admin | `{ expandedIds, selectedId, formMode, status, error }` | No | `setExpanded`, `setSelected`, `setFormMode`, `hydrateTree` | `TopicsManager.tsx`, `AdminTopicTree.tsx` |
| `blogEditor` | Admin | `{ draft, dirty, saveStatus, activeBlockId, previewOpen, errors }` | Yes (draft autosaved 1s) | `updateField`, `setBlocks`, `setActiveBlock`, `setPreviewOpen` | `BlogEditor.tsx`, `BlockList.tsx`, `SaveBar.tsx` |
