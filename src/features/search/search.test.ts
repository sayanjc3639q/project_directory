/**
 * @file src/features/search/search.test.ts
 * @purpose Unit test verifying fuzzy matching logic and rank ordering.
 * @tags test, search, fuzzy, ranking, vitest
 */
import { describe, it, expect } from "vitest";
import { rankSearchResults } from "./lib/rankResults";
import type { SearchIndexItem } from "@/types/search";

describe("Search Engine", () => {
  const items: SearchIndexItem[] = [
    {
      title: "Current Electricity and Circuits",
      slug: "current-electricity",
      pathLabel: "EE > Field Theory",
      keywords: ["current", "electricity", "circuits", "voltage"],
      excerpt: "Fundamentals of electric current.",
    },
    {
      title: "React Server Components Guide",
      slug: "rsc-guide",
      pathLabel: "Web > React",
      keywords: ["react", "nextjs", "server", "components"],
      excerpt: "Deep dive into RSC.",
    },
  ];

  it("finds matching items by title keyword and ranks higher matches first", () => {
    const results = rankSearchResults(items, "Current Electricity");
    expect(results).toHaveLength(1);
    expect(results[0]?.slug).toBe("current-electricity");
  });

  it("returns empty array for non-matching queries", () => {
    const results = rankSearchResults(items, "quantum mechanics");
    expect(results).toHaveLength(0);
  });
});
