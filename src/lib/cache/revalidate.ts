/**
 * @file src/lib/cache/revalidate.ts
 * @purpose Revalidation helpers for topic and blog modifications.
 * @tags cache, revalidate, revalidateTag, nextjs
 */
import { revalidateTag, revalidatePath } from "next/cache";
import { CACHE_TAGS, getTopicTag, getTopicBlogsTag, getBlogTag } from "./tags";

export function revalidateAfterTopicChange(topicId: string, ancestors: string[] = []): void {
  revalidateTag(CACHE_TAGS.TOPIC_TREE);
  revalidateTag(CACHE_TAGS.SEARCH_INDEX);
  revalidateTag(getTopicTag(topicId));
  revalidateTag(getTopicBlogsTag(topicId));

  for (const ancestorId of ancestors) {
    revalidateTag(getTopicTag(ancestorId));
    revalidateTag(getTopicBlogsTag(ancestorId));
  }

  revalidatePath("/", "layout");
}

export function revalidateAfterBlogChange(
  slug: string,
  topicPath: string[] = []
): void {
  revalidateTag(CACHE_TAGS.LATEST_BLOGS);
  revalidateTag(CACHE_TAGS.SEARCH_INDEX);
  revalidateTag(getBlogTag(slug));

  for (const topicId of topicPath) {
    revalidateTag(getTopicTag(topicId));
    revalidateTag(getTopicBlogsTag(topicId));
  }

  revalidatePath("/", "layout");
}
