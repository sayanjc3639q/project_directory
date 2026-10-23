/**
 * @file src/lib/id/subtopicId.test.ts
 * @purpose Unit tests for subtopic ID generation and validation.
 * @tags test, id, subtopic, vitest
 */
import { describe, it, expect } from "vitest";
import { generateSubtopicId, isValidSubtopicId } from "./subtopicId";

describe("subtopicId", () => {
  it("generates exactly 6 alphanumeric characters", () => {
    const id = generateSubtopicId();
    expect(id).toHaveLength(6);
    expect(isValidSubtopicId(id)).toBe(true);
  });

  it("produces unique identifiers over repeated calls", () => {
    const set = new Set<string>();
    for (let i = 0; i < 100; i++) {
      set.add(generateSubtopicId());
    }
    expect(set.size).toBe(100);
  });

  it("validates valid 6-char IDs and rejects invalid formats", () => {
    expect(isValidSubtopicId("A1b2C3")).toBe(true);
    expect(isValidSubtopicId("123456")).toBe(true);
    expect(isValidSubtopicId("abcdef")).toBe(true);
    expect(isValidSubtopicId("12345")).toBe(false);
    expect(isValidSubtopicId("1234567")).toBe(false);
    expect(isValidSubtopicId("123-56")).toBe(false);
    expect(isValidSubtopicId("")).toBe(false);
  });
});
