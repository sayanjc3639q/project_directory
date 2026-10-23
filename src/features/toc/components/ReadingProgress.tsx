/**
 * @file src/features/toc/components/ReadingProgress.tsx
 * @purpose Thin reading progress bar fixed to the top of the viewport.
 * @tags toc, progress, reader, indicator
 */
"use client";

import React, { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const current = (window.scrollY / total) * 100;
        setProgress(Math.min(100, Math.max(0, current)));
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 h-[3px] bg-accent z-50 transition-all duration-75"
      style={{ width: `${progress}%` }}
    />
  );
}
