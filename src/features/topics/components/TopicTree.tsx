/**
 * @file src/features/topics/components/TopicTree.tsx
 * @purpose Renders hierarchical topic tree for sidebar and navigation panels.
 * @tags topics, tree, sidebar, navigation
 */
import React from "react";
import type { TopicTreeNode as NodeData } from "@/types/topic";
import { TopicTreeNode } from "./TopicTreeNode";

export interface TopicTreeProps {
  tree: NodeData[];
  activePathKey?: string;
}

export function TopicTree({ tree, activePathKey }: TopicTreeProps) {
  if (!tree || tree.length === 0) {
    return (
      <div className="text-xs text-secondary-light dark:text-secondary-dark italic py-2">
        No topics configured.
      </div>
    );
  }

  return (
    <nav aria-label="Topic Tree Navigation" className="space-y-1">
      {tree.map((node) => (
        <TopicTreeNode
          key={node.id}
          node={node}
          activePathKey={activePathKey}
        />
      ))}
    </nav>
  );
}
