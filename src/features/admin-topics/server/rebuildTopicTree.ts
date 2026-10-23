/**
 * @file src/features/admin-topics/server/rebuildTopicTree.ts
 * @purpose Rebuilds denormalized meta/topicTree document from all topic records in Firestore.
 * @tags admin, topics, tree, denormalize, rebuild
 */
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS, META_DOCS } from "@/lib/firestore/collections";
import { mapDocToTopic } from "@/lib/firestore/mappers";
import type { Topic, TopicTreeNode } from "@/types/topic";

export async function rebuildTopicTree(): Promise<void> {
  const db = getAdminDb();
  const snap = await db.collection(COLLECTIONS.TOPICS).get();
  const topics: Topic[] = snap.docs.map(mapDocToTopic);

  const nodeMap = new Map<string, TopicTreeNode>();

  for (const t of topics) {
    nodeMap.set(t.id, {
      id: t.id,
      name: t.name,
      slug: t.slug,
      pathKey: t.pathKey,
      level: t.level,
      childCount: t.childCount,
      blogCount: t.blogCount,
      children: [],
    });
  }

  const roots: TopicTreeNode[] = [];

  for (const t of topics) {
    const node = nodeMap.get(t.id);
    if (!node) continue;

    if (!t.parentId) {
      roots.push(node);
    } else {
      const parent = nodeMap.get(t.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }
  }

  const sortNodes = (nodes: TopicTreeNode[]) => {
    nodes.sort((a, b) => a.name.localeCompare(b.name));
    nodes.forEach((n) => sortNodes(n.children));
  };
  sortNodes(roots);

  await db.collection(COLLECTIONS.META).doc(META_DOCS.TOPIC_TREE).set({
    tree: roots,
    updatedAt: new Date().toISOString(),
  });
}
