/**
 * @file src/features/seo/lib/buildArticleJsonLd.ts
 * @purpose Generates Schema.org Article structured data JSON-LD.
 * @tags seo, json-ld, article, schema
 */
import type { Blog } from "@/types/blog";

export function buildArticleJsonLd(blog: Blog, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    datePublished: blog.publishedAt || blog.createdAt,
    dateModified: blog.updatedAt,
    url: `${siteUrl}/blog/${blog.slug}`,
    keywords: blog.tags.join(", "),
    publisher: {
      "@type": "Organization",
      name: "Bilbili",
      url: siteUrl,
    },
  };
}
