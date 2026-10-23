/**
 * @file src/features/topics/components/TopicTreeNode.tsx
 * @purpose Renders single topic branch with recursive children and active path styling.
 * @tags topics, tree, node, recursion
 */
import React from "react";
import Link from "next/link";
import type { TopicTreeNode as NodeData } from "@/types/topic";

export interface TopicTreeNodeProps {
  node: NodeData;
  activePathKey?: string;
}

export function TopicTreeNode({ node, activePathKey }: TopicTreeNodeProps) {
  const isActive = activePathKey === node.pathKey;
  const isAncestor = activePathKey ? activePathKey.startsWith(`${node.pathKey}/`) : false;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="text-xs">
      <Link
        href={`/topic/${node.pathKey}`}
        className={`flex items-center justify-between py-1 px-2 rounded transition-colors ${
          isActive
            ? "bg-accent text-white font-semibold"
            : isAncestor
            ? "font-medium text-accent dark:text-accent-dark"
            : "text-text-light dark:text-text-dark hover:bg-surface-light dark:hover:bg-surface-dark"
        }`}
      >
        <span className="truncate">{node.name}</span>
        <span className="text-[10px] opacity-70 ml-2">{node.blogCount}</span>
      </Link>
      {hasChildren && (
        <div className="pl-3 border-l border-border-light dark:border-border-dark ml-2 my-0.5 space-y-0.5">
          {node.children.map((child) => (
            <TopicTreeNode
              key={child.id}
              node={child}
              activePathKey={activePathKey}
            />
          ))}
        </div>
      )}
    </div>
  );
}
