/**
 * @file src/app/search-index.json/route.ts
 * @purpose Generates public search index JSON with long-lived cache headers.
 * @tags api, search, json, cache, static
 */
import { NextResponse } from "next/server";
import { buildSearchIndex } from "@/features/search/server/buildSearchIndex";

export const revalidate = 3600;

export async function GET() {
  const indexData = await buildSearchIndex();

  return NextResponse.json(indexData, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
