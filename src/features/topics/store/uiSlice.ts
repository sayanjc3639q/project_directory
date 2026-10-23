/**
 * @file src/features/topics/store/uiSlice.ts
 * @purpose Redux slice for client UI drawer and expanded topic IDs.
 * @tags topics, ui, drawer, redux, slice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  drawerOpen: boolean;
  expandedTopicIds: string[];
  tocOpen: boolean;
}

const initialState: UiState = {
  drawerOpen: false,
  expandedTopicIds: [],
  tocOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },
    toggleTopicExpanded(state, action: PayloadAction<string>) {
      const id = action.payload;
      const index = state.expandedTopicIds.indexOf(id);
      if (index >= 0) {
        state.expandedTopicIds.splice(index, 1);
      } else {
        state.expandedTopicIds.push(id);
      }
    },
    setTocOpen(state, action: PayloadAction<boolean>) {
      state.tocOpen = action.payload;
    },
  },
});

export const { setDrawerOpen, toggleTopicExpanded, setTocOpen } = uiSlice.actions;
export default uiSlice.reducer;
