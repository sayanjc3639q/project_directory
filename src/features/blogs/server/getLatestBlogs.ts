/**
 * @file src/features/blogs/server/getLatestBlogs.ts
 * @purpose Server query retrieving latest published blogs for homepage or lists.
 * @tags blogs, query, latest, firestore, cache
 */
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { mapDocToBlog, mapBlogToSummary } from "@/lib/firestore/mappers";
import { CACHE_TAGS } from "@/lib/cache/tags";
import { createCachedQuery } from "@/lib/cache/cachedQuery";
import type { BlogSummary } from "@/types/blog";

async function fetchLatestBlogs(limitCount: number = 10): Promise<BlogSummary[]> {
  try {
    const db = getAdminDb();
    const snap = await db
      .collection(COLLECTIONS.BLOGS)
      .where("status", "==", "published")
      .orderBy("publishedAt", "desc")
      .limit(limitCount)
      .get();

    return snap.docs.map((doc) => mapBlogToSummary(mapDocToBlog(doc)));
  } catch {
    return [];
  }
}

export function getLatestBlogs(limitCount: number = 10) {
  return createCachedQuery(
    () => fetchLatestBlogs(limitCount),
    ["latest-blogs", String(limitCount)],
    [CACHE_TAGS.LATEST_BLOGS]
  )();
}
