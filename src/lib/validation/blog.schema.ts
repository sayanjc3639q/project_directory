/**
 * @file src/lib/validation/blog.schema.ts
 * @purpose Zod schema for blog creation, updates, and draft validations.
 * @tags validation, zod, blog, schema
 */
import { z } from "zod";
import { blockSchema } from "./block.schema";
import { referenceSchema } from "./reference.schema";

export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(120),
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens"),
  subtopicId: z.string().regex(/^[0-9A-Za-z]{6}$/, "Must be a 6-character subtopic ID"),
  blocks: z.array(blockSchema).min(1, "At least one block is required"),
  references: z.array(referenceSchema).default([]),
  acknowledgement: z.string().max(500).optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  tags: z.array(z.string().min(1).max(30)).default([]),
});

export type BlogInput = z.infer<typeof blogSchema>;
