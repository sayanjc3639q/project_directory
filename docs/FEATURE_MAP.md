# Feature Map

Hand-maintained lookup of all features in Bilbili.

| Feature | Route(s) | Entry File | All Files to Touch | Redux Slice(s) | Firestore Data | Cache Tags | Related Docs |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Scaffold & Setup** | All | `package.json` | `package.json`, `tsconfig.json`, `eslint.config.mjs`, `scripts/*` | N/A | N/A | N/A | `docs/SETUP.md` |
| **Theme System** | All | `src/features/theme/index.ts` | `themeSlice.ts`, `ThemeToggle.tsx`, `themeInitScript.ts`, `tokens.css` | `theme` | N/A | N/A | `docs/DESIGN_SYSTEM.md` |
| **Topic Hierarchy** | `/topic/[...slugs]` | `src/features/topics/index.ts` | `getTopicTree.ts`, `getTopicByPathKey.ts`, `TopicTree.tsx`, `Breadcrumbs.tsx` | `ui` | `topics`, `meta/topicTree` | `topic-tree`, `topic:{id}` | `docs/DATA_MODEL.md` |
| **Blog Display** | `/blog/[slug]` | `src/features/blogs/index.ts` | `getBlogBySlug.ts`, `BlogBody.tsx`, `BlockRenderer.tsx`, `PrevNextLinks.tsx` | N/A | `blogs` | `blog:{slug}` | `docs/DATA_MODEL.md` |
| **Search Engine** | `/search`, modal | `src/features/search/index.ts` | `searchSlice.ts`, `SearchBar.tsx`, `fuzzyMatch.ts`, `buildSearchIndex.ts` | `search` | `blogs` | `search-index` | `docs/ARCHITECTURE.md` |
| **Bookmarks & History** | `/saved` | `src/features/bookmarks/index.ts` | `bookmarksSlice.ts`, `recentSlice.ts`, `BookmarkButton.tsx`, `SavedList.tsx` | `bookmarks`, `recent` | Client storage | N/A | `docs/REDUX_MAP.md` |
| **Admin Auth** | `/admin/login` | `src/features/admin-auth/index.ts` | `requireAdmin.ts`, `createSession.ts`, `verifySession.ts`, `LoginForm.tsx` | N/A | Firebase Auth | N/A | `docs/SECURITY.md` |
| **Admin Topics** | `/admin/topics` | `src/features/admin-topics/index.ts` | `TopicsManager.tsx`, `createTopic.action.ts`, `rebuildTopicTree.ts` | `adminTopics` | `topics`, `meta/topicTree` | `topic-tree` | `docs/DATA_MODEL.md` |
| **Admin Blogs** | `/admin/blogs/*` | `src/features/admin-blogs/index.ts` | `BlogEditor.tsx`, `saveBlog.action.ts`, `SubtopicIdField.tsx`, `newBlock.ts` | `blogEditor` | `blogs` | `blog:{slug}`, `latest-blogs` | `docs/DATA_MODEL.md` |
