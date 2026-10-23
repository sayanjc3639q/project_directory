/**
 * @file src/features/blogs/components/Acknowledgement.tsx
 * @purpose Renders optional acknowledgement message at the end of a blog post.
 * @tags blogs, acknowledgement, credits
 */
import React from "react";

export function Acknowledgement({ text }: { text?: string }) {
  if (!text) return null;

  return (
    <section className="mt-8 p-4 border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark text-xs text-secondary-light dark:text-secondary-dark leading-relaxed">
      <span className="font-semibold text-text-light dark:text-text-dark mr-1">
        Acknowledgement:
      </span>
      {text}
    </section>
  );
}
