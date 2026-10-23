/**
 * @file src/store/PublicStoreProvider.tsx
 * @purpose Client provider component mounting the per-request Public Redux Store.
 * @tags redux, provider, client, public-store
 */
"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { makePublicStore, PublicStore } from "./publicStore";

export function PublicStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<PublicStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makePublicStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
