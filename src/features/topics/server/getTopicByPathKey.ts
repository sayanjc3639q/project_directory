/**
 * @file src/features/topics/server/getTopicByPathKey.ts
 * @purpose Cached server query retrieving a topic document matching a slug pathKey.
 * @tags topics, query, pathKey, firestore, cache
 */
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { mapDocToTopic } from "@/lib/firestore/mappers";
import { getTopicTag } from "@/lib/cache/tags";
import { createCachedQuery } from "@/lib/cache/cachedQuery";
import type { Topic } from "@/types/topic";

async function fetchTopicByPathKey(pathKey: string): Promise<Topic | null> {
  try {
    const db = getAdminDb();
    const snap = await db
      .collection(COLLECTIONS.TOPICS)
      .where("pathKey", "==", pathKey)
      .limit(1)
      .get();

    if (snap.empty || !snap.docs[0]) {
      return null;
    }

    return mapDocToTopic(snap.docs[0]);
  } catch {
    return null;
  }
}

export function getTopicByPathKey(pathKey: string) {
  return createCachedQuery(
    () => fetchTopicByPathKey(pathKey),
    ["topic-by-path", pathKey],
    [getTopicTag(pathKey)]
  )();
}
