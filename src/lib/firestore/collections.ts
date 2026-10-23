/**
 * @file src/lib/firestore/collections.ts
 * @purpose Collection name constants and typed Firestore document references.
 * @tags firestore, collections, database, references
 */

export const COLLECTIONS = {
  TOPICS: "topics",
  BLOGS: "blogs",
  META: "meta",
} as const;

export const META_DOCS = {
  TOPIC_TREE: "topicTree",
} as const;
