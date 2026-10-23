/**
 * @file src/features/topics/components/ChildTopicList.tsx
 * @purpose Renders clickable subtopic badges for direct child topics.
 * @tags topics, subtopics, badges, navigation
 */
import React from "react";
import Link from "next/link";
import type { TopicTreeNode } from "@/types/topic";

export interface ChildTopicListProps {
  childrenNodes: TopicTreeNode[];
}

export function ChildTopicList({ childrenNodes }: ChildTopicListProps) {
  if (!childrenNodes || childrenNodes.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-secondary-light dark:text-secondary-dark mb-3">
        Subtopics
      </h2>
      <div className="flex flex-wrap gap-2">
        {childrenNodes.map((child) => (
          <Link
            key={child.id}
            href={`/topic/${child.pathKey}`}
            className="px-3 py-1.5 text-xs font-medium rounded border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-accent text-text-light dark:text-text-dark"
          >
            {child.name} ({child.blogCount})
          </Link>
        ))}
      </div>
    </div>
  );
}
