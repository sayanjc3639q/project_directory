/**
 * @file src/features/admin-blogs/server/afterBlogChange.ts
 * @purpose Revalidates cache tags and paths after blog creation, edit, or deletion.
 * @tags admin, blog, cache, revalidate
 */
import { revalidateAfterBlogChange } from "@/lib/cache/revalidate";

export async function afterBlogChange(
  slug: string,
  topicPath: string[] = []
): Promise<void> {
  revalidateAfterBlogChange(slug, topicPath);
}
