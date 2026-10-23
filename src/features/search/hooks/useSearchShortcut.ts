/**
 * @file src/features/search/hooks/useSearchShortcut.ts
 * @purpose Client hook triggering search focus when pressing "/" key.
 * @tags search, shortcut, keyboard, a11y
 */
"use client";

import { useEffect } from "react";

export function useSearchShortcut(onTrigger: () => void) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        onTrigger();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onTrigger]);
}
