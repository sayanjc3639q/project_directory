/**
 * @file src/features/admin-topics/adminTopics.test.ts
 * @purpose Unit test validating admin topic action exports and error handling.
 * @tags test, admin, topics, server-actions, vitest
 */
import { describe, it, expect, vi } from "vitest";
import { createTopicAction } from "./server/createTopic.action";
import * as adminAuth from "@/features/admin-auth";

describe("Admin Topics Actions", () => {
  it("rejects unauthorized caller when requireAdmin fails", async () => {
    vi.spyOn(adminAuth, "requireAdmin").mockRejectedValue(
      new Error("Unauthorized: Missing session cookie")
    );

    const res = await createTopicAction({
      name: "Test Topic",
      slug: "test-topic",
    });

    expect(res.success).toBe(false);
    expect(res.error).toContain("Unauthorized");
  });
});
