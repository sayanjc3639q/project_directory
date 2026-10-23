/**
 * @file src/lib/validation/topic.schema.ts
 * @purpose Zod schema for topic validation and creation payloads.
 * @tags validation, zod, topic, schema
 */
import { z } from "zod";

export const topicSchema = z.object({
  name: z.string().min(2, "Topic name must have at least 2 characters").max(60),
  slug: z
    .string()
    .min(2, "Slug must have at least 2 characters")
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase alphanumeric and hyphens"),
  parentId: z.string().nullable().optional(),
});

export const renameTopicSchema = z.object({
  id: z.string().regex(/^[0-9A-Za-z]{6}$/, "Invalid 6-character topic ID"),
  name: z.string().min(2).max(60),
  slug: z.string().min(2).max(60).regex(/^[a-z0-9-]+$/),
});

export const moveTopicSchema = z.object({
  id: z.string().regex(/^[0-9A-Za-z]{6}$/, "Invalid 6-character topic ID"),
  newParentId: z.string().regex(/^[0-9A-Za-z]{6}$/, "Invalid parent ID").nullable(),
});

export type TopicInput = z.infer<typeof topicSchema>;
export type RenameTopicInput = z.infer<typeof renameTopicSchema>;
export type MoveTopicInput = z.infer<typeof moveTopicSchema>;
