/**
 * @file src/features/toc/hooks/useScrollSpy.ts
 * @purpose Client hook tracking active heading ID using IntersectionObserver.
 * @tags toc, scroll-spy, hook, intersection-observer
 */
"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(headingIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (headingIds.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "0% 0% -70% 0%",
      }
    );

    headingIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headingIds]);

  return activeId;
}
