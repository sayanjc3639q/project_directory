/**
 * @file src/features/search/store/searchSlice.ts
 * @purpose Redux slice for client search bar query and modal state.
 * @tags search, redux, slice, modal
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  query: string;
  isOpen: boolean;
  activeIndex: number;
  indexStatus: "idle" | "loading" | "ready" | "error";
}

const initialState: SearchState = {
  query: "",
  isOpen: false,
  activeIndex: -1,
  indexStatus: "idle",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
      if (!action.payload) {
        state.activeIndex = -1;
      }
    },
    setActiveIndex(state, action: PayloadAction<number>) {
      state.activeIndex = action.payload;
    },
    setIndexStatus(state, action: PayloadAction<SearchState["indexStatus"]>) {
      state.indexStatus = action.payload;
    },
  },
});

export const { setQuery, setOpen, setActiveIndex, setIndexStatus } = searchSlice.actions;
export default searchSlice.reducer;
