/**
 * @file src/features/admin-auth/components/LogoutButton.tsx
 * @purpose Admin header logout button terminating session and redirecting.
 * @tags auth, logout, button, admin, client
 */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { adminSignOut } from "../lib/signInWithEmail";
import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await adminSignOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      Log out
    </Button>
  );
}
