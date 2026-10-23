/**
 * @file src/features/bookmarks/components/SavedList.tsx
 * @purpose Renders lists of client-saved bookmarks and recently viewed articles.
 * @tags bookmarks, saved, recent, list, client
 */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePublicSelector, usePublicDispatch } from "@/store/hooks";
import { clearBookmarks } from "../store/bookmarksSlice";
import { clearRecent } from "../store/recentSlice";

export function SavedList() {
  const [mounted, setMounted] = useState(false);
  const bookmarks = usePublicSelector((state) => state.bookmarks.items);
  const recent = usePublicSelector((state) => state.recent.items);
  const dispatch = usePublicDispatch();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="text-xs text-secondary-light">Loading saved articles...</div>;
  }

  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Bookmarked Articles ({bookmarks.length})</h2>
          {bookmarks.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(clearBookmarks())}
              className="text-xs text-secondary-light hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
        {bookmarks.length === 0 ? (
          <p className="text-xs text-secondary-light italic">No articles bookmarked yet.</p>
        ) : (
          <div className="space-y-3">
            {bookmarks.map((b) => (
              <div key={b.slug} className="p-4 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark">
                <Link href={`/blog/${b.slug}`} className="font-semibold text-sm hover:underline text-accent">
                  {b.title}
                </Link>
                <div className="text-xs text-secondary-light dark:text-secondary-dark mt-1">
                  {b.pathLabel}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recently Viewed ({recent.length})</h2>
          {recent.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(clearRecent())}
              className="text-xs text-secondary-light hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
        {recent.length === 0 ? (
          <p className="text-xs text-secondary-light italic">No recently viewed history.</p>
        ) : (
          <div className="space-y-3">
            {recent.map((r) => (
              <div key={r.slug} className="p-4 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark">
                <Link href={`/blog/${r.slug}`} className="font-semibold text-sm hover:underline text-accent">
                  {r.title}
                </Link>
                <div className="text-xs text-secondary-light dark:text-secondary-dark mt-1">
                  {r.pathLabel}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
