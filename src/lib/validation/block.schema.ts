/**
 * @file src/lib/validation/block.schema.ts
 * @purpose Zod schema for validated discriminated union of content blocks.
 * @tags validation, zod, block, schema
 */
import { z } from "zod";

const subtitleSchema = z.object({
  id: z.string(),
  type: z.literal("subtitle"),
  level: z.union([z.literal(2), z.literal(3)]),
  text: z.string().min(1, "Subtitle text cannot be empty"),
});

const paragraphSchema = z.object({
  id: z.string(),
  type: z.literal("paragraph"),
  text: z.string().min(1, "Paragraph text cannot be empty"),
});

const bulletListSchema = z.object({
  id: z.string(),
  type: z.literal("bulletList"),
  items: z.array(z.string().min(1)).min(1),
});

const numberedListSchema = z.object({
  id: z.string(),
  type: z.literal("numberedList"),
  items: z.array(z.string().min(1)).min(1),
});

const tableSchema = z.object({
  id: z.string(),
  type: z.literal("table"),
  headers: z.array(z.string()).optional(),
  rows: z.array(z.array(z.string())),
  caption: z.string().optional(),
});

const imageSchema = z.object({
  id: z.string(),
  type: z.literal("image"),
  url: z.string().url(),
  alt: z.string().min(1, "Image alt text is required"),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const codeSchema = z.object({
  id: z.string(),
  type: z.literal("code"),
  language: z.string().default("text"),
  code: z.string(),
  filename: z.string().optional(),
});

const calloutSchema = z.object({
  id: z.string(),
  type: z.literal("callout"),
  variant: z.union([z.literal("note"), z.literal("warning")]),
  text: z.string().min(1),
});

const equationSchema = z.object({
  id: z.string(),
  type: z.literal("equation"),
  latex: z.string().min(1),
  display: z.boolean().optional(),
});

export const blockSchema = z.discriminatedUnion("type", [
  subtitleSchema,
  paragraphSchema,
  bulletListSchema,
  numberedListSchema,
  tableSchema,
  imageSchema,
  codeSchema,
  calloutSchema,
  equationSchema,
]);

export type BlockSchemaType = z.infer<typeof blockSchema>;
