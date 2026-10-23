/**
 * @file src/features/admin-blogs/server/duplicateBlog.action.ts
 * @purpose Server action duplicating an existing blog post as a draft with unique slug.
 * @tags admin, blog, duplicate, draft, server-action
 */
"use server";

import { requireAdmin } from "@/features/admin-auth";
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { mapDocToBlog } from "@/lib/firestore/mappers";
import type { ActionResponse } from "@/types/api";

export async function duplicateBlogAction(id: string): Promise<ActionResponse<{ id: string }>> {
  try {
    await requireAdmin(false);
    const db = getAdminDb();
    const snap = await db.collection(COLLECTIONS.BLOGS).doc(id).get();

    if (!snap.exists) {
      throw new Error("Source blog not found");
    }

    const blog = mapDocToBlog(snap);
    const now = new Date().toISOString();
    const rand = Math.random().toString(36).substring(2, 6);
    const newSlug = `${blog.slug}-copy-${rand}`;

    const docRef = await db.collection(COLLECTIONS.BLOGS).add({
      ...blog,
      title: `${blog.title} (Copy)`,
      slug: newSlug,
      status: "draft",
      publishedAt: null,
      createdAt: now,
      updatedAt: now,
    });

    return { success: true, data: { id: docRef.id } };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to duplicate blog";
    return { success: false, error: message };
  }
}
