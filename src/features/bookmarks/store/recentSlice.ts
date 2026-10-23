/**
 * @file src/features/bookmarks/store/recentSlice.ts
 * @purpose Redux slice for managing client-persisted recently viewed blog articles.
 * @tags recent, bookmarks, redux, slice, history
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BookmarkItem } from "./bookmarksSlice";

export interface RecentItem extends BookmarkItem {
  visitedAt: string;
}

export interface RecentState {
  items: RecentItem[];
}

const initialState: RecentState = {
  items: [],
};

const MAX_RECENT = 20;

export const recentSlice = createSlice({
  name: "recent",
  initialState,
  reducers: {
    addRecent(state, action: PayloadAction<RecentItem>) {
      state.items = state.items.filter((item) => item.slug !== action.payload.slug);
      state.items.unshift(action.payload);
      if (state.items.length > MAX_RECENT) {
        state.items = state.items.slice(0, MAX_RECENT);
      }
    },
    clearRecent(state) {
      state.items = [];
    },
  },
});

export const { addRecent, clearRecent } = recentSlice.actions;
export default recentSlice.reducer;
