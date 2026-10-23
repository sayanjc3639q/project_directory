/**
 * @file src/features/topics/lib/buildBreadcrumbs.ts
 * @purpose Generates breadcrumb path segments from slugPath and nameChain.
 * @tags topics, breadcrumbs, navigation, urls
 */

export interface BreadcrumbSegment {
  name: string;
  href: string;
  isLast: boolean;
}

export function buildBreadcrumbs(
  slugPath: string[],
  nameChain: string[]
): BreadcrumbSegment[] {
  const segments: BreadcrumbSegment[] = [];
  let cumulative = "";

  for (let i = 0; i < slugPath.length; i++) {
    const slug = slugPath[i];
    const name = nameChain[i] || slug;
    cumulative = cumulative ? `${cumulative}/${slug}` : slug;

    segments.push({
      name,
      href: `/topic/${cumulative}`,
      isLast: i === slugPath.length - 1,
    });
  }

  return segments;
}
