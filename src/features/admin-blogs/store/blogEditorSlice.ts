/**
 * @file src/features/admin-blogs/store/blogEditorSlice.ts
 * @purpose Redux slice for admin blog editor form state, blocks, and autosave.
 * @tags admin, blog, editor, redux, slice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Block } from "@/types/block";
import type { BlogReference, BlogStatus } from "@/types/blog";

export interface BlogDraftState {
  title: string;
  slug: string;
  subtopicId: string;
  resolvedPath: string;
  blocks: Block[];
  references: BlogReference[];
  acknowledgement: string;
  tags: string[];
  status: BlogStatus;
}

export interface BlogEditorState {
  draft: BlogDraftState;
  dirty: boolean;
  saveStatus: "idle" | "saving" | "saved" | "error";
  activeBlockId: string | null;
  previewOpen: boolean;
  errors: Record<string, string>;
}

const initialDraft: BlogDraftState = {
  title: "",
  slug: "",
  subtopicId: "",
  resolvedPath: "",
  blocks: [],
  references: [],
  acknowledgement: "",
  tags: [],
  status: "draft",
};

const initialState: BlogEditorState = {
  draft: initialDraft,
  dirty: false,
  saveStatus: "idle",
  activeBlockId: null,
  previewOpen: false,
  errors: {},
};

export const blogEditorSlice = createSlice({
  name: "blogEditor",
  initialState,
  reducers: {
    updateDraft(state, action: PayloadAction<Partial<BlogDraftState>>) {
      state.draft = { ...state.draft, ...action.payload };
      state.dirty = true;
    },
    setBlocks(state, action: PayloadAction<Block[]>) {
      state.draft.blocks = action.payload;
      state.dirty = true;
    },
    setActiveBlockId(state, action: PayloadAction<string | null>) {
      state.activeBlockId = action.payload;
    },
    setPreviewOpen(state, action: PayloadAction<boolean>) {
      state.previewOpen = action.payload;
    },
    setSaveStatus(state, action: PayloadAction<BlogEditorState["saveStatus"]>) {
      state.saveStatus = action.payload;
    },
    resetEditor(state) {
      state.draft = initialDraft;
      state.dirty = false;
      state.saveStatus = "idle";
      state.errors = {};
    },
  },
});

export const {
  updateDraft,
  setBlocks,
  setActiveBlockId,
  setPreviewOpen,
  setSaveStatus,
  resetEditor,
} = blogEditorSlice.actions;
export default blogEditorSlice.reducer;
