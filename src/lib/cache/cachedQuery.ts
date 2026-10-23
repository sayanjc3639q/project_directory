/**
 * @file src/lib/cache/cachedQuery.ts
 * @purpose Wrapper around unstable_cache for Firestore query caching with tags.
 * @tags cache, unstable_cache, firestore, query
 */
import { unstable_cache } from "next/cache";

export function createCachedQuery<T, Args extends unknown[]>(
  queryFn: (...args: Args) => Promise<T>,
  keyParts: string[],
  tags: string[],
  revalidateSeconds: number = 3600
): (...args: Args) => Promise<T> {
  return unstable_cache(queryFn, keyParts, {
    tags,
    revalidate: revalidateSeconds,
  });
}
