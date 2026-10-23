/**
 * @file src/features/topics/components/TopicCardGrid.tsx
 * @purpose Grid layout container for rendering multiple topic cards.
 * @tags topics, grid, cards, layout
 */
import React from "react";
import type { TopicTreeNode } from "@/types/topic";
import { TopicCard } from "./TopicCard";

export interface TopicCardGridProps {
  topics: TopicTreeNode[];
}

export function TopicCardGrid({ topics }: TopicCardGridProps) {
  if (topics.length === 0) {
    return (
      <div className="p-6 text-sm text-secondary-light dark:text-secondary-dark border border-dashed border-border-light dark:border-border-dark rounded text-center">
        No topics found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {topics.map((t) => (
        <TopicCard key={t.id} topic={t} />
      ))}
    </div>
  );
}
