/**
 * @file src/features/blogs/server/getBlogBySlug.ts
 * @purpose Server query retrieving published blog document by unique slug.
 * @tags blogs, query, slug, firestore, cache
 */
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { mapDocToBlog } from "@/lib/firestore/mappers";
import { getBlogTag } from "@/lib/cache/tags";
import { createCachedQuery } from "@/lib/cache/cachedQuery";
import type { Blog } from "@/types/blog";

async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const db = getAdminDb();
    const snap = await db
      .collection(COLLECTIONS.BLOGS)
      .where("slug", "==", slug)
      .limit(1)
      .get();

    if (snap.empty || !snap.docs[0]) {
      return null;
    }

    return mapDocToBlog(snap.docs[0]);
  } catch {
    return null;
  }
}

export function getBlogBySlug(slug: string) {
  return createCachedQuery(
    () => fetchBlogBySlug(slug),
    ["blog-by-slug", slug],
    [getBlogTag(slug)]
  )();
}
