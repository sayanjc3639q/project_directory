/**
 * @file src/store/publicStore.ts
 * @purpose Public Redux store factory containing public client-only slices.
 * @tags redux, store, public, factory
 */
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "@/features/theme/store/themeSlice";
import bookmarksReducer from "@/features/bookmarks/store/bookmarksSlice";
import recentReducer from "@/features/bookmarks/store/recentSlice";
import searchReducer from "@/features/search/store/searchSlice";
import uiReducer from "@/features/topics/store/uiSlice";
import { persistListenerMiddleware } from "./middleware/persistListener";

export function makePublicStore() {
  return configureStore({
    reducer: {
      theme: themeReducer,
      bookmarks: bookmarksReducer,
      recent: recentReducer,
      search: searchReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(persistListenerMiddleware.middleware),
  });
}

export type PublicStore = ReturnType<typeof makePublicStore>;
export type PublicRootState = ReturnType<PublicStore["getState"]>;
export type PublicDispatch = PublicStore["dispatch"];
