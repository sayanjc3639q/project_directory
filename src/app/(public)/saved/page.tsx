/**
 * @file src/app/(public)/saved/page.tsx
 * @purpose Saved articles page rendering user bookmarks and reading history.
 * @tags bookmarks, saved, page, client-state
 */
import React from "react";
import { SavedList } from "@/features/bookmarks";

export default function SavedPage() {
  return (
    <div className="max-w-reading mx-auto py-4">
      <SavedList />
    </div>
  );
}
