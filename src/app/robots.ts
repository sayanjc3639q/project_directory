/**
 * @file src/app/robots.ts
 * @purpose Generates crawling policies and sitemap reference for search engines.
 * @tags seo, robots, crawler, indexing
 */
import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bilbili.edu";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
