/**
 * @file src/lib/firestore/mappers.ts
 * @purpose Serialization and deserialization mappers for Firestore documents.
 * @tags firestore, mappers, serialization, documents
 */
import type { Topic } from "@/types/topic";
import type { Blog, BlogSummary } from "@/types/blog";
import type admin from "firebase-admin";

export function mapDocToTopic(doc: admin.firestore.DocumentSnapshot): Topic {
  const data = doc.data() || {};
  return {
    id: doc.id,
    name: data.name || "",
    slug: data.slug || "",
    parentId: data.parentId || null,
    level: data.level || 0,
    ancestors: data.ancestors || [],
    slugPath: data.slugPath || [],
    pathKey: data.pathKey || "",
    nameChain: data.nameChain || [],
    childCount: data.childCount || 0,
    blogCount: data.blogCount || 0,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
  };
}

export function mapDocToBlog(doc: admin.firestore.DocumentSnapshot): Blog {
  const data = doc.data() || {};
  return {
    id: doc.id,
    title: data.title || "",
    slug: data.slug || "",
    subtopicId: data.subtopicId || "",
    topicPath: data.topicPath || [],
    topicPathKey: data.topicPathKey || "",
    topicNameChain: data.topicNameChain || [],
    blocks: data.blocks || [],
    references: data.references || [],
    acknowledgement: data.acknowledgement,
    status: data.status || "draft",
    excerpt: data.excerpt || "",
    readingTime: data.readingTime || 1,
    tags: data.tags || [],
    keywords: data.keywords || [],
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString(),
    publishedAt: data.publishedAt || null,
  };
}

export function mapBlogToSummary(blog: Blog): BlogSummary {
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    topicPathKey: blog.topicPathKey,
    topicNameChain: blog.topicNameChain,
    excerpt: blog.excerpt,
    readingTime: blog.readingTime,
    tags: blog.tags,
    publishedAt: blog.publishedAt || blog.createdAt,
  };
}
