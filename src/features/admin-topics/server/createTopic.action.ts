/**
 * @file src/features/admin-topics/server/createTopic.action.ts
 * @purpose Server action creating new main topic or nested subtopic with 6-char ID.
 * @tags admin, topics, server-action, create
 */
"use server";

import { requireAdmin } from "@/features/admin-auth";
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { topicSchema } from "@/lib/validation/topic.schema";
import { generateUniqueTopicId } from "./generateUniqueId";
import { afterTopicChange } from "./afterTopicChange";
import { mapDocToTopic } from "@/lib/firestore/mappers";
import type { ActionResponse } from "@/types/api";

export async function createTopicAction(formData: {
  name: string;
  slug: string;
  parentId?: string | null;
}): Promise<ActionResponse<{ id: string }>> {
  try {
    await requireAdmin(false);
    const parsed = topicSchema.parse(formData);
    const db = getAdminDb();

    let ancestors: string[] = [];
    let slugPath: string[] = [parsed.slug];
    let nameChain: string[] = [parsed.name];
    let level = 0;

    const topicId = await db.runTransaction(async (transaction) => {
      if (parsed.parentId) {
        const parentRef = db.collection(COLLECTIONS.TOPICS).doc(parsed.parentId);
        const parentSnap = await transaction.get(parentRef);
        if (!parentSnap.exists) {
          throw new Error("Parent topic not found");
        }
        const parentTopic = mapDocToTopic(parentSnap);
        ancestors = [...parentTopic.ancestors, parentTopic.id];
        slugPath = [...parentTopic.slugPath, parsed.slug];
        nameChain = [...parentTopic.nameChain, parsed.name];
        level = parentTopic.level + 1;

        transaction.update(parentRef, {
          childCount: (parentTopic.childCount || 0) + 1,
          updatedAt: new Date().toISOString(),
        });
      }

      const id = await generateUniqueTopicId(db, transaction);
      const docRef = db.collection(COLLECTIONS.TOPICS).doc(id);
      const now = new Date().toISOString();

      transaction.set(docRef, {
        id,
        name: parsed.name,
        slug: parsed.slug,
        parentId: parsed.parentId || null,
        level,
        ancestors,
        slugPath,
        pathKey: slugPath.join("/"),
        nameChain,
        childCount: 0,
        blogCount: 0,
        createdAt: now,
        updatedAt: now,
      });

      return id;
    });

    await afterTopicChange(topicId, ancestors);
    return { success: true, data: { id: topicId } };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create topic";
    return { success: false, error: message };
  }
}
