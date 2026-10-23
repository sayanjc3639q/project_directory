/**
 * @file src/features/seo/seo.test.ts
 * @purpose Unit test verifying Article JSON-LD schema builder output.
 * @tags test, seo, json-ld, article, vitest
 */
import { describe, it, expect } from "vitest";
import { buildArticleJsonLd } from "./lib/buildArticleJsonLd";
import type { Blog } from "@/types/blog";

describe("SEO JSON-LD", () => {
  it("builds valid schema.org Article representation", () => {
    const blog: Blog = {
      id: "b1",
      title: "Current Electricity",
      slug: "current-electricity",
      subtopicId: "A1b2C3",
      topicPath: ["A1b2C3"],
      topicPathKey: "ee/current",
      topicNameChain: ["EE", "Current"],
      blocks: [],
      references: [],
      status: "published",
      excerpt: "Electrical physics guide.",
      readingTime: 3,
      tags: ["physics", "circuits"],
      keywords: ["physics", "circuits"],
      createdAt: "2026-10-24T00:00:00.000Z",
      updatedAt: "2026-10-24T00:00:00.000Z",
      publishedAt: "2026-10-24T00:00:00.000Z",
    };

    const jsonLd = buildArticleJsonLd(blog, "https://bilbili.edu");
    expect(jsonLd["@type"]).toBe("Article");
    expect(jsonLd.headline).toBe("Current Electricity");
    expect(jsonLd.url).toBe("https://bilbili.edu/blog/current-electricity");
    expect(jsonLd.description).toBe("Electrical physics guide.");
  });
});
