/**
 * @file src/store/middleware/persistListener.ts
 * @purpose Listener middleware to save theme, bookmarks, and recent slices to localStorage.
 * @tags redux, middleware, persist, localStorage
 */
import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { setTheme } from "@/features/theme/store/themeSlice";
import { toggleBookmark, clearBookmarks } from "@/features/bookmarks/store/bookmarksSlice";
import { addRecent, clearRecent } from "@/features/bookmarks/store/recentSlice";

export const persistListenerMiddleware = createListenerMiddleware();

persistListenerMiddleware.startListening({
  actionCreator: setTheme,
  effect: async (action) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bilbili_theme", JSON.stringify(action.payload));
      const html = document.documentElement;
      if (action.payload === "dark") {
        html.setAttribute("data-theme", "dark");
      } else if (action.payload === "light") {
        html.removeAttribute("data-theme");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersDark) {
          html.setAttribute("data-theme", "dark");
        } else {
          html.removeAttribute("data-theme");
        }
      }
    }
  },
});

persistListenerMiddleware.startListening({
  matcher: isAnyOf(toggleBookmark, clearBookmarks, addRecent, clearRecent),
  effect: async (_action, listenerApi) => {
    await listenerApi.delay(300);
    if (typeof window !== "undefined") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const state = listenerApi.getState() as any;
      if (state.bookmarks) {
        localStorage.setItem("bilbili_bookmarks", JSON.stringify(state.bookmarks.items));
      }
      if (state.recent) {
        localStorage.setItem("bilbili_recent", JSON.stringify(state.recent.items));
      }
    }
  },
});
