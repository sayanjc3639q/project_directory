/**
 * @file src/lib/utils/cn.ts
 * @purpose Utility for merging Tailwind CSS classes with clsx and twMerge.
 * @tags utils, tailwind, classes, styling
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
