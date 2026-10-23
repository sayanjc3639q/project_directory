/**
 * @file src/components/layout/SkipLink.tsx
 * @purpose Accessible skip-to-content navigation link for screen readers and keyboard users.
 * @tags accessibility, skip-link, keyboard, a11y
 */
import React from "react";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded focus:outline-none"
    >
      Skip to main content
    </a>
  );
}
