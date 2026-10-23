/**
 * @file src/store/store.test.ts
 * @purpose Unit test verifying public and admin store separation and slice behavior.
 * @tags test, redux, store, slices, vitest
 */
import { describe, it, expect } from "vitest";
import { makePublicStore } from "./publicStore";
import { makeAdminStore } from "./adminStore";
import { setTheme } from "@/features/theme/store/themeSlice";
import { toggleBookmark } from "@/features/bookmarks/store/bookmarksSlice";
import { setSelectedId } from "@/features/admin-topics/store/adminTopicsSlice";

describe("Redux Stores", () => {
  it("initializes public store with theme, bookmarks, search, and ui slices", () => {
    const store = makePublicStore();
    const state = store.getState();

    expect(state.theme.mode).toBe("system");
    expect(state.bookmarks.items).toEqual([]);
    expect(state.search.query).toBe("");
    expect(state.ui.drawerOpen).toBe(false);

    store.dispatch(setTheme("dark"));
    expect(store.getState().theme.mode).toBe("dark");

    store.dispatch(
      toggleBookmark({
        slug: "intro-circuit",
        title: "Intro to Circuits",
        pathLabel: "EE > Circuits",
        savedAt: "2026-10-24T00:00:00.000Z",
      })
    );
    expect(store.getState().bookmarks.items).toHaveLength(1);
  });

  it("initializes admin store with adminTopics and blogEditor slices", () => {
    const store = makeAdminStore();
    const state = store.getState();

    expect(state.adminTopics.selectedId).toBeNull();
    expect(state.blogEditor.dirty).toBe(false);

    store.dispatch(setSelectedId("A1B2C3"));
    expect(store.getState().adminTopics.selectedId).toBe("A1B2C3");
  });
});
