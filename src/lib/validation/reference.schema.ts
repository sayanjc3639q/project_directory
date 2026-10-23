/**
 * @file src/lib/validation/reference.schema.ts
 * @purpose Zod validation schema for external blog references and citations.
 * @tags validation, zod, reference, citations
 */
import { z } from "zod";

export const referenceSchema = z.object({
  label: z.string().min(1, "Reference label is required").max(100),
  url: z
    .string()
    .url("Must be a valid URL")
    .refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
      message: "Only http and https protocols are allowed",
    }),
});

export type ReferenceInput = z.infer<typeof referenceSchema>;
