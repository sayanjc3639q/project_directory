/**
 * @file src/app/sitemap.ts
 * @purpose Generates XML sitemap containing home, topic pages, and published blogs.
 * @tags sitemap, seo, xml, routes
 */
import type { MetadataRoute } from "next";
import { getLatestBlogs } from "@/features/blogs";
import { getTopicTree } from "@/features/topics";
import { flattenTopicTree } from "@/features/topics";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bilbili.edu";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/saved`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  try {
    const tree = await getTopicTree();
    const flattened = flattenTopicTree(tree);

    for (const t of flattened) {
      routes.push({
        url: `${SITE_URL}/topic/${t.pathKey}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }

    const blogs = await getLatestBlogs(100);
    for (const b of blogs) {
      routes.push({
        url: `${SITE_URL}/blog/${b.slug}`,
        lastModified: new Date(b.publishedAt),
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch {
    // Fallback if DB unavailable during build
  }

  return routes;
}
