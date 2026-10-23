# Changelog

All notable changes to the Bilbili project are documented here. Format: newest first.

## [1.0.0] - 2026-10-24
- P10: Performance pass, bundle measurement (<113 kB on blog page passing target <120 kB), root not-found page, complete verified production build (18/18 static pages rendered), and full verification pass.

## [0.10.0] - 2026-10-24
- P9: Bookmarks and history (BookmarkButton, SavedList, /saved route), SEO structured data (buildArticleJsonLd, JsonLd), sitemap.ts, robots.ts, manifest.ts, rss.xml route, offline page, and service worker sw.js.

## [0.9.0] - 2026-10-24
- P8: Instant search engine (buildSearchIndex, /search-index.json route), fuzzy matching and ranking (fuzzyMatch, rankResults), SearchBar in Header with keyboard shortcut (/), and /search results page.

## [0.8.0] - 2026-10-24
- P7: Admin blog editor (BlogEditor, BlockList, BlockListItem, SubtopicIdField, SaveBar, BlogTable), server actions (saveBlogAction, deleteBlogAction, duplicateBlogAction, resolveSubtopicAction), and routes (/admin/blogs, /admin/blogs/new, /admin/blogs/[id]/edit).

## [0.7.0] - 2026-10-24
- P6: Admin topics manager (createTopicAction, renameTopicAction, deleteTopicAction, rebuildTopicTree, afterTopicChange), SubtopicIdBadge with copy button, TopicForm, AdminTopicTree, and /admin/topics page.

## [0.6.0] - 2026-10-24
- P5: Admin auth flow (createSession, verifySessionCookie, requireAdmin), session cookie API route (/api/session), middleware check, LoginForm and LogoutButton components, and protected /admin layout and dashboard.

## [0.5.0] - 2026-10-24
- P4: Blog server queries (getBlogBySlug, getLatestBlogs, getPrevNext), block renderers (Subtitle, Paragraph, Bullet/Numbered List, Table, Image, Code, Callout, Equation), TableOfContents with scroll-spy, ReadingProgress bar, and public /blog/[slug] route.

## [0.4.0] - 2026-10-24
- P3: Topic server queries (getTopicTree, getTopicByPathKey, getTopicById), breadcrumb and flatten helpers, TopicCard, TopicCardGrid, TopicTree, Breadcrumbs components, and public /topic/[...slugs] route with loading skeleton.

## [0.3.0] - 2026-10-24
- P2: Redux dual store setup (publicStore, adminStore), typed hooks, listener middleware persistence, theme feature with anti-flash script, Button and Container components, and layout shells.

## [0.2.0] - 2026-10-24
- P1: Firebase client and admin configurations, Firestore collections, mappers, Zod schemas, cache tag revalidation helpers, and validation test suite.

## [0.1.0] - 2026-10-24
- P0: Initial scaffolding of project structure, configs, lint rules, scripts, and documentation skeleton.
