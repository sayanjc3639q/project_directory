/**
 * @file src/features/topics/components/TopicCard.tsx
 * @purpose Solid flat card rendering a topic summary, child count, and blog count.
 * @tags topics, card, component, flat-design
 */
import React from "react";
import Link from "next/link";
import type { TopicTreeNode } from "@/types/topic";

export interface TopicCardProps {
  topic: TopicTreeNode;
}

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      href={`/topic/${topic.pathKey}`}
      className="group relative p-6 border border-border-light dark:border-border-dark rounded-xl bg-surface-light dark:bg-surface-dark hover:border-accent hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-accent dark:text-accent-dark">
          Level {topic.level} Topic
        </span>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-border-light dark:bg-border-dark text-secondary-light dark:text-secondary-dark font-medium">
          {topic.blogCount} articles
        </span>
      </div>
      <h3 className="font-bold text-lg text-text-light dark:text-text-dark group-hover:text-accent transition-colors">
        {topic.name}
      </h3>
      {topic.childCount > 0 && (
        <div className="text-xs text-secondary-light dark:text-secondary-dark mt-2">
          {topic.childCount} subtopics available
        </div>
      )}
    </Link>
  );
}
