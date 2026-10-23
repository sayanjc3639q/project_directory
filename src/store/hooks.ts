/**
 * @file src/store/hooks.ts
 * @purpose Typed React-Redux dispatch and selector hooks for Public and Admin stores.
 * @tags redux, hooks, types, selectors
 */
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import type { PublicDispatch, PublicRootState } from "./publicStore";
import type { AdminDispatch, AdminRootState } from "./adminStore";

export const usePublicDispatch: () => PublicDispatch = useDispatch;
export const usePublicSelector: TypedUseSelectorHook<PublicRootState> = useSelector;

export const useAdminDispatch: () => AdminDispatch = useDispatch;
export const useAdminSelector: TypedUseSelectorHook<AdminRootState> = useSelector;
