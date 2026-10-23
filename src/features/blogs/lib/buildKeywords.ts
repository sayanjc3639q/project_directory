/**
 * @file src/features/blogs/lib/buildKeywords.ts
 * @purpose Generates normalized lowercase search keywords from title, tags, and content.
 * @tags blogs, keywords, search, indexing
 */
export function buildKeywords(
  title: string,
  tags: string[],
  plainText: string
): string[] {
  const combined = `${title} ${tags.join(" ")} ${plainText.slice(0, 1000)}`;
  const tokens = combined
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 2);

  return Array.from(new Set(tokens)).slice(0, 50);
}
