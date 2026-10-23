/**
 * @file src/features/admin-topics/server/renameTopic.action.ts
 * @purpose Server action renaming topic and propagating name and slug changes.
 * @tags admin, topics, server-action, rename
 */
"use server";

import { requireAdmin } from "@/features/admin-auth";
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { renameTopicSchema } from "@/lib/validation/topic.schema";
import { afterTopicChange } from "./afterTopicChange";
import { mapDocToTopic } from "@/lib/firestore/mappers";
import type { ActionResponse } from "@/types/api";

export async function renameTopicAction(formData: {
  id: string;
  name: string;
  slug: string;
}): Promise<ActionResponse> {
  try {
    await requireAdmin(false);
    const parsed = renameTopicSchema.parse(formData);
    const db = getAdminDb();

    const topicRef = db.collection(COLLECTIONS.TOPICS).doc(parsed.id);
    const snap = await topicRef.get();
    if (!snap.exists) throw new Error("Topic not found");
    const current = mapDocToTopic(snap);

    const oldSlugPath = [...current.slugPath];
    const newSlugPath = [...current.slugPath.slice(0, -1), parsed.slug];
    const newNameChain = [...current.nameChain.slice(0, -1), parsed.name];

    await topicRef.update({
      name: parsed.name,
      slug: parsed.slug,
      slugPath: newSlugPath,
      pathKey: newSlugPath.join("/"),
      nameChain: newNameChain,
      updatedAt: new Date().toISOString(),
    });

    const oldPathPrefix = oldSlugPath.join("/");
    const newPathPrefix = newSlugPath.join("/");

    const descSnap = await db
      .collection(COLLECTIONS.TOPICS)
      .where("ancestors", "array-contains", parsed.id)
      .get();

    if (!descSnap.empty) {
      const batch = db.batch();
      for (const d of descSnap.docs) {
        const dData = mapDocToTopic(d);
        const updatedKey = dData.pathKey.replace(oldPathPrefix, newPathPrefix);
        batch.update(d.ref, {
          pathKey: updatedKey,
          slugPath: updatedKey.split("/"),
          updatedAt: new Date().toISOString(),
        });
      }
      await batch.commit();
    }

    await afterTopicChange(parsed.id, current.ancestors);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to rename topic";
    return { success: false, error: message };
  }
}
