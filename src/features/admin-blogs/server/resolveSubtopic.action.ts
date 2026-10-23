/**
 * @file src/features/admin-blogs/server/resolveSubtopic.action.ts
 * @purpose Server action resolving 6-char subtopic ID to its full path chain.
 * @tags admin, blog, subtopic, resolve, pathKey
 */
"use server";

import { requireAdmin } from "@/features/admin-auth";
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { mapDocToTopic } from "@/lib/firestore/mappers";
import type { ActionResponse } from "@/types/api";

export async function resolveSubtopicAction(
  subtopicId: string
): Promise<ActionResponse<{ pathKey: string; nameChain: string[]; topicPath: string[] }>> {
  try {
    await requireAdmin(false);

    if (!/^[0-9A-Za-z]{6}$/.test(subtopicId)) {
      return { success: false, error: "Invalid 6-character subtopic ID" };
    }

    const db = getAdminDb();
    const snap = await db.collection(COLLECTIONS.TOPICS).doc(subtopicId).get();

    if (!snap.exists) {
      return { success: false, error: "Subtopic ID not found in database" };
    }

    const topic = mapDocToTopic(snap);
    const topicPath = [...topic.ancestors, topic.id];

    return {
      success: true,
      data: {
        pathKey: topic.pathKey,
        nameChain: topic.nameChain,
        topicPath,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to resolve subtopic";
    return { success: false, error: message };
  }
}
