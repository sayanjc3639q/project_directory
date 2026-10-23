/**
 * @file src/features/admin-topics/server/afterTopicChange.ts
 * @purpose Rebuilds denormalized topic tree and triggers cache revalidations.
 * @tags admin, topics, cache, revalidate
 */
import { rebuildTopicTree } from "./rebuildTopicTree";
import { revalidateAfterTopicChange } from "@/lib/cache/revalidate";

export async function afterTopicChange(topicId: string, ancestors: string[] = []): Promise<void> {
  await rebuildTopicTree();
  revalidateAfterTopicChange(topicId, ancestors);
}
