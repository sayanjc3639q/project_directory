/**
 * @file src/types/topic.ts
 * @purpose TypeScript definitions for topic documents and hierarchical tree nodes.
 * @tags types, topic, hierarchy, tree
 */

export interface Topic {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  level: number;
  ancestors: string[];
  slugPath: string[];
  pathKey: string;
  nameChain: string[];
  childCount: number;
  blogCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TopicTreeNode {
  id: string;
  name: string;
  slug: string;
  pathKey: string;
  level: number;
  childCount: number;
  blogCount: number;
  children: TopicTreeNode[];
}

export interface TopicTreeDocument {
  tree: TopicTreeNode[];
  updatedAt: string;
}
