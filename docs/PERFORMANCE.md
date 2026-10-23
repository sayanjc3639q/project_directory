## Performance Targets & Recorded Metrics

### Measured Production Bundle Sizes
- First Load JS shared by all routes: **103 kB** (Target: < 120 kB)
- `/` (Home): **103 kB**
- `/blog/[slug]`: **113 kB** (Target: < 120 kB - PASS)
- `/topic/[...slugs]`: **106 kB**
- `/search`: **108 kB**
- `/saved`: **117 kB**
- `/offline`: **106 kB**

### Performance Targets
- Lighthouse Score: 95+ on mobile for Performance, Accessibility, Best Practices, SEO.
- LCP: < 2.0s
- CLS: < 0.1
- INP: < 200ms
- Gzipped JS on public blog page: < 120 KB (Actual: 113 kB - PASS)

## Strategies
- Server Components by default.
- Dynamic import of KaTeX and @dnd-kit.
- Server-side syntax highlighting using Shiki.
- Zero client Firebase SDK on public pages.
- Denormalized search index route `/search-index.json`.
