/**
 * @file src/app/rss.xml/route.ts
 * @purpose Generates public RSS 2.0 XML feed for published blog articles.
 * @tags rss, feed, xml, articles, public
 */
import { NextResponse } from "next/server";
import { getLatestBlogs } from "@/features/blogs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bilbili.edu";

export async function GET() {
  const blogs = await getLatestBlogs(25);

  const itemsXml = blogs
    .map(
      (b) => `
    <item>
      <title><![CDATA[${b.title}]]></title>
      <link>${SITE_URL}/blog/${b.slug}</link>
      <guid>${SITE_URL}/blog/${b.slug}</guid>
      <pubDate>${new Date(b.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${b.excerpt}]]></description>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Bilbili</title>
    <link>${SITE_URL}</link>
    <description>Educational and informative blog articles</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
