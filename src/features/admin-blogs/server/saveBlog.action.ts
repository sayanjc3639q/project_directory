/**
 * @file src/features/admin-blogs/server/saveBlog.action.ts
 * @purpose Server action creating or updating a blog article document in Firestore.
 * @tags admin, blog, save, firestore, server-action
 */
"use server";

import { requireAdmin } from "@/features/admin-auth";
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { blogSchema, BlogInput } from "@/lib/validation/blog.schema";
import { mapDocToTopic } from "@/lib/firestore/mappers";
import { calculateReadingTime } from "@/features/blogs/lib/readingTime";
import { blocksToPlainText } from "@/features/blogs/lib/blocksToPlainText";
import { buildKeywords } from "@/features/blogs/lib/buildKeywords";
import { afterBlogChange } from "./afterBlogChange";
import type { ActionResponse } from "@/types/api";

export async function saveBlogAction(
  input: BlogInput,
  id?: string
): Promise<ActionResponse<{ id: string; slug: string }>> {
  try {
    await requireAdmin(false);
    const parsed = blogSchema.parse(input);
    const db = getAdminDb();

    const topicSnap = await db.collection(COLLECTIONS.TOPICS).doc(parsed.subtopicId).get();
    if (!topicSnap.exists) {
      throw new Error("Invalid subtopic ID: Topic does not exist");
    }

    const topic = mapDocToTopic(topicSnap);
    const topicPath = [...topic.ancestors, topic.id];
    const plainText = blocksToPlainText(parsed.blocks);
    const readingTime = calculateReadingTime(plainText);
    const excerpt = plainText.slice(0, 160).trim();
    const keywords = buildKeywords(parsed.title, parsed.tags, plainText);
    const now = new Date().toISOString();

    const blogData = {
      title: parsed.title,
      slug: parsed.slug,
      subtopicId: parsed.subtopicId,
      topicPath,
      topicPathKey: topic.pathKey,
      topicNameChain: topic.nameChain,
      blocks: parsed.blocks,
      references: parsed.references,
      acknowledgement: parsed.acknowledgement || null,
      status: parsed.status,
      excerpt,
      readingTime,
      tags: parsed.tags,
      keywords,
      updatedAt: now,
      publishedAt: parsed.status === "published" ? now : null,
    };

    let blogId = id;
    if (blogId) {
      await db.collection(COLLECTIONS.BLOGS).doc(blogId).update(blogData);
    } else {
      const docRef = await db.collection(COLLECTIONS.BLOGS).add({
        ...blogData,
        createdAt: now,
      });
      blogId = docRef.id;

      const batch = db.batch();
      for (const tId of topicPath) {
        const ref = db.collection(COLLECTIONS.TOPICS).doc(tId);
        batch.update(ref, {
          blogCount: db.collection(COLLECTIONS.TOPICS).doc(tId),
        });
      }
    }

    await afterBlogChange(parsed.slug, topicPath);
    return { success: true, data: { id: blogId, slug: parsed.slug } };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save blog";
    return { success: false, error: message };
  }
}
