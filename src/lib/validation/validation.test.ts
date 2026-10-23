/**
 * @file src/lib/validation/validation.test.ts
 * @purpose Unit tests for Zod schemas covering topics, blocks, and references.
 * @tags test, validation, zod, vitest
 */
import { describe, it, expect } from "vitest";
import { topicSchema } from "./topic.schema";
import { referenceSchema } from "./reference.schema";
import { blockSchema } from "./block.schema";

describe("Validation Schemas", () => {
  it("validates topic schemas successfully", () => {
    const valid = { name: "React Framework", slug: "react-framework" };
    expect(topicSchema.safeParse(valid).success).toBe(true);

    const invalidSlug = { name: "React", slug: "React Framework!" };
    expect(topicSchema.safeParse(invalidSlug).success).toBe(false);
  });

  it("validates references and strictly permits only http/https", () => {
    const valid = { label: "Docs", url: "https://nextjs.org" };
    expect(referenceSchema.safeParse(valid).success).toBe(true);

    const javascriptUrl = { label: "Attack", url: "javascript:alert(1)" };
    expect(referenceSchema.safeParse(javascriptUrl).success).toBe(false);
  });

  it("validates discriminated union content blocks", () => {
    const paragraph = { id: "p1", type: "paragraph", text: "Hello world" };
    expect(blockSchema.safeParse(paragraph).success).toBe(true);

    const code = { id: "c1", type: "code", code: "const x = 1;", language: "ts" };
    expect(blockSchema.safeParse(code).success).toBe(true);

    const invalid = { id: "bad", type: "unknown", text: "test" };
    expect(blockSchema.safeParse(invalid).success).toBe(false);
  });
});
