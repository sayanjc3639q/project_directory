/**
 * @file src/features/blogs/lib/readingTime.ts
 * @purpose Calculates estimated reading time in minutes based on word count.
 * @tags blogs, reading-time, words, utility
 */

export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
