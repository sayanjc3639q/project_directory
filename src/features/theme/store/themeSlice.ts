/**
 * @file src/features/theme/store/themeSlice.ts
 * @purpose Redux slice for managing user theme preferences (light, dark, system).
 * @tags theme, redux, slice, ui
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: "system",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
