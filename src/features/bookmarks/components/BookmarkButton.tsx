/**
 * @file src/features/bookmarks/components/BookmarkButton.tsx
 * @purpose Bookmark toggle button persisting article to client localStorage via Redux.
 * @tags bookmarks, button, toggle, client
 */
"use client";

import React, { useEffect, useState } from "react";
import { usePublicDispatch, usePublicSelector } from "@/store/hooks";
import { toggleBookmark, BookmarkItem } from "../store/bookmarksSlice";

export function BookmarkButton({ item }: { item: BookmarkItem }) {
  const dispatch = usePublicDispatch();
  const [mounted, setMounted] = useState(false);
  const isSaved = usePublicSelector((state) =>
    state.bookmarks.items.some((b) => b.slug === item.slug)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="px-3 py-1.5 text-xs border border-border-light dark:border-border-dark rounded opacity-60"
      >
        Bookmark
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleBookmark(item))}
      className={`px-3 py-1.5 text-xs font-medium border rounded transition-colors ${
        isSaved
          ? "bg-accent text-white border-accent hover:bg-accent-hover"
          : "border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark hover:border-accent"
      }`}
    >
      {isSaved ? "Saved" : "Bookmark"}
    </button>
  );
}
