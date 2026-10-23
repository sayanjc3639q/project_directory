# Bilbili Routes

| Route | Type | Description |
| :--- | :--- | :--- |
| `/` | Public | Home page with main topic cards, latest blogs, search bar |
| `/topic/[...slugs]` | Public | Topic or nested subtopic page resolved via `pathKey` |
| `/blog/[slug]` | Public | Blog article view |
| `/search` | Public | Search query results (`?q=`) |
| `/saved` | Public | Bookmarks and recently read articles (client-only) |
| `/offline` | Public | Offline fallback page |
| `/admin/login` | Admin | Admin credentials login |
| `/admin` | Admin | Admin dashboard |
| `/admin/topics` | Admin | Topic hierarchy manager |
| `/admin/blogs` | Admin | Blog post table and filter list |
| `/admin/blogs/new` | Admin | Create new blog post |
| `/admin/blogs/[id]/edit` | Admin | Edit blog post |
| `/rss.xml` | Utility | RSS Feed |
| `/sitemap.xml` | Utility | Dynamic sitemap |
| `/robots.txt` | Utility | Crawling policies |
| `/search-index.json` | Utility | Search corpus index |
| `/api/session` | Utility | Cookie session handler |
