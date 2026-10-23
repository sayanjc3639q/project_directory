/**
 * @file src/features/topics/server/getTopicById.ts
 * @purpose Cached server query retrieving a topic document by its private 6-char ID.
 * @tags topics, query, id, firestore, cache
 */
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { mapDocToTopic } from "@/lib/firestore/mappers";
import { getTopicTag } from "@/lib/cache/tags";
import { createCachedQuery } from "@/lib/cache/cachedQuery";
import type { Topic } from "@/types/topic";

async function fetchTopicById(id: string): Promise<Topic | null> {
  try {
    const db = getAdminDb();
    const snap = await db.collection(COLLECTIONS.TOPICS).doc(id).get();
    if (!snap.exists) {
      return null;
    }
    return mapDocToTopic(snap);
  } catch {
    return null;
  }
}

export function getTopicById(id: string) {
  return createCachedQuery(
    () => fetchTopicById(id),
    ["topic-by-id", id],
    [getTopicTag(id)]
  )();
}
