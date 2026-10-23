/**
 * @file src/features/blogs/server/getPrevNext.ts
 * @purpose Retrieves previous and next blogs in chronological order within the same topic.
 * @tags blogs, prev-next, pagination, firestore
 */
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { mapDocToBlog, mapBlogToSummary } from "@/lib/firestore/mappers";
import type { BlogSummary } from "@/types/blog";

export async function getPrevNextBlogs(
  topicId: string,
  currentPublishedAt: string
): Promise<{ prev: BlogSummary | null; next: BlogSummary | null }> {
  try {
    const db = getAdminDb();
    const prevSnap = await db
      .collection(COLLECTIONS.BLOGS)
      .where("status", "==", "published")
      .where("topicPath", "array-contains", topicId)
      .where("publishedAt", "<", currentPublishedAt)
      .orderBy("publishedAt", "desc")
      .limit(1)
      .get();

    const nextSnap = await db
      .collection(COLLECTIONS.BLOGS)
      .where("status", "==", "published")
      .where("topicPath", "array-contains", topicId)
      .where("publishedAt", ">", currentPublishedAt)
      .orderBy("publishedAt", "asc")
      .limit(1)
      .get();

    const prev = prevSnap.empty || !prevSnap.docs[0]
      ? null
      : mapBlogToSummary(mapDocToBlog(prevSnap.docs[0]));

    const next = nextSnap.empty || !nextSnap.docs[0]
      ? null
      : mapBlogToSummary(mapDocToBlog(nextSnap.docs[0]));

    return { prev, next };
  } catch {
    return { prev: null, next: null };
  }
}
