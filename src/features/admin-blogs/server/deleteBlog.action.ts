/**
 * @file src/features/admin-blogs/server/deleteBlog.action.ts
 * @purpose Server action deleting blog post and revalidating cache paths.
 * @tags admin, blog, delete, server-action
 */
"use server";

import { requireAdmin } from "@/features/admin-auth";
import { getAdminDb } from "@/lib/firebase/admin-db";
import { COLLECTIONS } from "@/lib/firestore/collections";
import { mapDocToBlog } from "@/lib/firestore/mappers";
import { afterBlogChange } from "./afterBlogChange";
import type { ActionResponse } from "@/types/api";

export async function deleteBlogAction(id: string): Promise<ActionResponse> {
  try {
    await requireAdmin(false);
    const db = getAdminDb();
    const docRef = db.collection(COLLECTIONS.BLOGS).doc(id);
    const snap = await docRef.get();

    if (!snap.exists) {
      throw new Error("Blog not found");
    }

    const blog = mapDocToBlog(snap);
    await docRef.delete();

    await afterBlogChange(blog.slug, blog.topicPath);
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete blog";
    return { success: false, error: message };
  }
}
