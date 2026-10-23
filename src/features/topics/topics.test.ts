/**
 * @file src/features/topics/topics.test.ts
 * @purpose Unit tests for topic breadcrumb generation and tree flattening.
 * @tags test, topics, breadcrumbs, flatten, vitest
 */
import { describe, it, expect } from "vitest";
import { buildBreadcrumbs } from "./lib/buildBreadcrumbs";
import { flattenTopicTree } from "./lib/flattenTree";
import type { TopicTreeNode } from "@/types/topic";

describe("Topics Utilities", () => {
  it("builds breadcrumbs correctly with cumulative paths", () => {
    const slugPath = ["tech", "frontend", "react"];
    const nameChain = ["Technology", "Frontend", "React"];

    const breadcrumbs = buildBreadcrumbs(slugPath, nameChain);

    expect(breadcrumbs).toHaveLength(3);
    expect(breadcrumbs[0]).toEqual({
      name: "Technology",
      href: "/topic/tech",
      isLast: false,
    });
    expect(breadcrumbs[1]).toEqual({
      name: "Frontend",
      href: "/topic/tech/frontend",
      isLast: false,
    });
    expect(breadcrumbs[2]).toEqual({
      name: "React",
      href: "/topic/tech/frontend/react",
      isLast: true,
    });
  });

  it("flattens a nested topic tree into an ordered array", () => {
    const tree: TopicTreeNode[] = [
      {
        id: "T1",
        name: "Tech",
        slug: "tech",
        pathKey: "tech",
        level: 0,
        childCount: 1,
        blogCount: 2,
        children: [
          {
            id: "T2",
            name: "React",
            slug: "react",
            pathKey: "tech/react",
            level: 1,
            childCount: 0,
            blogCount: 2,
            children: [],
          },
        ],
      },
    ];

    const flattened = flattenTopicTree(tree);
    expect(flattened).toHaveLength(2);
    expect(flattened[0]?.id).toBe("T1");
    expect(flattened[1]?.id).toBe("T2");
  });
});
