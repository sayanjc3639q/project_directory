/**
 * @file src/features/admin-topics/server/deleteTopic.action.ts
 * @purpose Server action deleting an empty topic with zero children and zero blogs.
 * @tags admin, topics, server-action, delete
 */
"use server";

import { requireAdmin } from "@/features/admin-auth";
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { mapDocToTopic } from "@/lib/firestore/mappers";
import { afterTopicChange } from "./afterTopicChange";
import type { ActionResponse } from "@/types/api";

export async function deleteTopicAction(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin(false);
    const db = getAdminDb();
    let ancestors: string[] = [];

    await db.runTransaction(async (transaction) => {
      const docRef = db.collection(COLLECTIONS.TOPICS).doc(id);
      const snap = await transaction.get(docRef);

      if (!snap.exists) {
        throw new Error("Topic not found");
      }

      const topic = mapDocToTopic(snap);
      ancestors = topic.ancestors;

      if (topic.childCount > 0) {
        throw new Error("Cannot delete topic with child subtopics. Move or delete them first.");
      }
      if (topic.blogCount > 0) {
        throw new Error("Cannot delete topic containing blog articles. Move or delete them first.");
      }

      if (topic.parentId) {
        const parentRef = db.collection(COLLECTIONS.TOPICS).doc(topic.parentId);
        const parentSnap = await transaction.get(parentRef);
        if (parentSnap.exists) {
          const p = mapDocToTopic(parentSnap);
          transaction.update(parentRef, {
            childCount: Math.max(0, (p.childCount || 1) - 1),
            updatedAt: new Date().toISOString(),
          });
        }
      }

      transaction.delete(docRef);
    });

    await afterTopicChange(id, ancestors);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete topic";
    return { success: false, error: message };
  }
}
