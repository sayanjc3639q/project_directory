/**
 * @file src/features/topics/server/getTopicTree.ts
 * @purpose Cached server query retrieving the denormalized topic tree document.
 * @tags topics, tree, cache, server-query
 */
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS, META_DOCS } from "@/lib/firestore/collections";
import { CACHE_TAGS } from "@/lib/cache/tags";
import { createCachedQuery } from "@/lib/cache/cachedQuery";
import type { TopicTreeNode, TopicTreeDocument } from "@/types/topic";

async function fetchTopicTree(): Promise<TopicTreeNode[]> {
  try {
    const db = getAdminDb();
    const snap = await db
      .collection(COLLECTIONS.META)
      .doc(META_DOCS.TOPIC_TREE)
      .get();

    if (!snap.exists) {
      return [];
    }

    const data = snap.data() as TopicTreeDocument;
    return data.tree || [];
  } catch {
    return [];
  }
}

export const getTopicTree = createCachedQuery(
  fetchTopicTree,
  ["topic-tree"],
  [CACHE_TAGS.TOPIC_TREE]
);
