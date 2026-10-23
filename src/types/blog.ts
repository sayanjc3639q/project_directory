/**
 * @file src/types/blog.ts
 * @purpose TypeScript interfaces for blog articles and references.
 * @tags types, blog, article, firestore
 */
import type { Block } from "./block";

export interface BlogReference {
  label: string;
  url: string;
}

export type BlogStatus = "draft" | "published";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  subtopicId: string;
  topicPath: string[];
  topicPathKey: string;
  topicNameChain: string[];
  blocks: Block[];
  references: BlogReference[];
  acknowledgement?: string;
  status: BlogStatus;
  excerpt: string;
  readingTime: number;
  tags: string[];
  keywords: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

export interface BlogSummary {
  id: string;
  title: string;
  slug: string;
  topicPathKey: string;
  topicNameChain: string[];
  excerpt: string;
  readingTime: number;
  tags: string[];
  publishedAt: string;
}
