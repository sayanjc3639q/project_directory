/**
 * @file src/features/search/server/buildSearchIndex.ts
 * @purpose Generates public search index omitting private IDs and sensitive fields.
 * @tags search, index, build, public, cache
 */
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { mapDocToBlog } from "@/lib/firestore/mappers";
import type { SearchIndexItem } from "@/types/search";

export async function buildSearchIndex(): Promise<SearchIndexItem[]> {
  try {
    const db = getAdminDb();
    const snap = await db
      .collection(COLLECTIONS.BLOGS)
      .where("status", "==", "published")
      .select("title", "slug", "topicNameChain", "keywords", "excerpt")
      .get();

    return snap.docs.map((doc) => {
      const b = mapDocToBlog(doc);
      return {
        title: b.title,
        slug: b.slug,
        pathLabel: b.topicNameChain.join(" > "),
        keywords: b.keywords,
        excerpt: b.excerpt,
      };
    });
  } catch {
    return [];
  }
}
