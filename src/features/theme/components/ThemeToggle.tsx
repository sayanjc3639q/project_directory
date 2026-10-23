/**
 * @file src/features/theme/components/ThemeToggle.tsx
 * @purpose Client component toggle for light, dark, and system color modes.
 * @tags theme, toggle, component, client
 */
"use client";

import React, { useEffect } from "react";
import { usePublicDispatch, usePublicSelector } from "@/store/hooks";
import { setTheme, ThemeMode } from "../store/themeSlice";

export function ThemeToggle() {
  const dispatch = usePublicDispatch();
  const currentMode = usePublicSelector((state) => state.theme.mode);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bilbili_theme");
      if (stored) {
        dispatch(setTheme(JSON.parse(stored) as ThemeMode));
      }
    } catch {
      // Ignore storage errors
    }
  }, [dispatch]);

  const cycleTheme = () => {
    const next: ThemeMode =
      currentMode === "light" ? "dark" : currentMode === "dark" ? "system" : "light";
    dispatch(setTheme(next));
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={`Theme: ${currentMode}. Click to toggle.`}
      className="px-3 py-1.5 text-xs font-medium border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark hover:bg-border-light dark:hover:bg-border-dark"
    >
      Theme: {currentMode}
    </button>
  );
}
