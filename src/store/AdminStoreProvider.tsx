/**
 * @file src/store/AdminStoreProvider.tsx
 * @purpose Client provider component mounting the per-request Admin Redux Store.
 * @tags redux, provider, client, admin-store
 */
"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { makeAdminStore, AdminStore } from "./adminStore";

export function AdminStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AdminStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeAdminStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
