/**
 * @file src/features/topics/lib/flattenTree.ts
 * @purpose Utility to flatten hierarchical topic tree nodes into an array.
 * @tags topics, tree, flatten, utility
 */
import type { TopicTreeNode } from "@/types/topic";

export function flattenTopicTree(nodes: TopicTreeNode[]): TopicTreeNode[] {
  const result: TopicTreeNode[] = [];

  function traverse(list: TopicTreeNode[]) {
    for (const node of list) {
      result.push(node);
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    }
  }

  traverse(nodes);
  return result;
}
