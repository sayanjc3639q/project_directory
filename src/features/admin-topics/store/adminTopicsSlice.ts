/**
 * @file src/features/admin-topics/store/adminTopicsSlice.ts
 * @purpose Redux slice for admin topic tree expanded nodes and active forms.
 * @tags admin, topics, redux, slice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AdminTopicsState {
  expandedIds: string[];
  selectedId: string | null;
  formMode: "idle" | "create" | "rename" | "move" | "delete";
  status: "idle" | "loading" | "error";
  error: string | null;
}

const initialState: AdminTopicsState = {
  expandedIds: [],
  selectedId: null,
  formMode: "idle",
  status: "idle",
  error: null,
};

export const adminTopicsSlice = createSlice({
  name: "adminTopics",
  initialState,
  reducers: {
    setExpandedIds(state, action: PayloadAction<string[]>) {
      state.expandedIds = action.payload;
    },
    toggleTopicExpanded(state, action: PayloadAction<string>) {
      const id = action.payload;
      const idx = state.expandedIds.indexOf(id);
      if (idx >= 0) {
        state.expandedIds.splice(idx, 1);
      } else {
        state.expandedIds.push(id);
      }
    },
    setSelectedId(state, action: PayloadAction<string | null>) {
      state.selectedId = action.payload;
    },
    setFormMode(state, action: PayloadAction<AdminTopicsState["formMode"]>) {
      state.formMode = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setExpandedIds,
  toggleTopicExpanded,
  setSelectedId,
  setFormMode,
  setError,
} = adminTopicsSlice.actions;
export default adminTopicsSlice.reducer;
