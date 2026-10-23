/**
 * @file src/features/bookmarks/store/bookmarksSlice.ts
 * @purpose Redux slice for managing client-persisted bookmarked blog articles.
 * @tags bookmarks, redux, slice, client-storage
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookmarkItem {
  slug: string;
  title: string;
  pathLabel: string;
  savedAt: string;
}

export interface BookmarksState {
  items: BookmarkItem[];
}

const initialState: BookmarksState = {
  items: [],
};

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    toggleBookmark(state, action: PayloadAction<BookmarkItem>) {
      const idx = state.items.findIndex((item) => item.slug === action.payload.slug);
      if (idx >= 0) {
        state.items.splice(idx, 1);
      } else {
        state.items.unshift(action.payload);
      }
    },
    clearBookmarks(state) {
      state.items = [];
    },
  },
});

export const { toggleBookmark, clearBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
