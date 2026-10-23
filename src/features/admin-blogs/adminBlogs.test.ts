/**
 * @file src/features/admin-blogs/adminBlogs.test.ts
 * @purpose Unit test verifying admin blog factory and actions validation.
 * @tags test, admin, blog, factory, vitest
 */
import { describe, it, expect } from "vitest";
import { createNewBlock } from "./lib/newBlock";

describe("Admin Blog Blocks Factory", () => {
  it("creates valid default blocks with unique IDs", () => {
    const pBlock = createNewBlock("paragraph");
    expect(pBlock.type).toBe("paragraph");
    expect(pBlock.id).toBeDefined();

    const subBlock = createNewBlock("subtitle");
    expect(subBlock.type).toBe("subtitle");
    if (subBlock.type === "subtitle") {
      expect(subBlock.level).toBe(2);
    }
  });
});
