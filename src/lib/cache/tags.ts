/**
 * @file src/lib/cache/tags.ts
 * @purpose Centralized cache tag constants and factory helpers for Next.js caching.
 * @tags cache, tags, revalidation, nextjs
 */

export const CACHE_TAGS = {
  TOPIC_TREE: "topic-tree",
  LATEST_BLOGS: "latest-blogs",
  SEARCH_INDEX: "search-index",
} as const;

export function getTopicTag(id: string): string {
  return `topic:${id}`;
}

export function getTopicBlogsTag(id: string): string {
  return `topic-blogs:${id}`;
}

export function getBlogTag(slug: string): string {
  return `blog:${slug}`;
}
