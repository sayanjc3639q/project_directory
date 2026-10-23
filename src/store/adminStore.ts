/**
 * @file src/store/adminStore.ts
 * @purpose Admin Redux store factory containing administrative editing slices.
 * @tags redux, store, admin, factory
 */
import { configureStore } from "@reduxjs/toolkit";
import adminTopicsReducer from "@/features/admin-topics/store/adminTopicsSlice";
import blogEditorReducer from "@/features/admin-blogs/store/blogEditorSlice";

export function makeAdminStore() {
  return configureStore({
    reducer: {
      adminTopics: adminTopicsReducer,
      blogEditor: blogEditorReducer,
    },
  });
}

export type AdminStore = ReturnType<typeof makeAdminStore>;
export type AdminRootState = ReturnType<AdminStore["getState"]>;
export type AdminDispatch = AdminStore["dispatch"];
