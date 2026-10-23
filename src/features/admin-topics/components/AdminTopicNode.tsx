/**
 * @file src/features/admin-topics/components/AdminTopicNode.tsx
 * @purpose Admin topic tree node showing private ID, copy button, and management actions.
 * @tags admin, topics, node, tree, subtopicId
 */
"use client";

import React from "react";
import type { TopicTreeNode } from "@/types/topic";
import { SubtopicIdBadge } from "./SubtopicIdBadge";
import { deleteTopicAction } from "../server/deleteTopic.action";

export interface AdminTopicNodeProps {
  node: TopicTreeNode;
  onAddSubtopic: (id: string, name: string) => void;
  onRefresh: () => void;
}

export function AdminTopicNode({
  node,
  onAddSubtopic,
  onRefresh,
}: AdminTopicNodeProps) {
  async function handleDelete() {
    if (!confirm(`Delete topic "${node.name}"?`)) return;
    const res = await deleteTopicAction(node.id);
    if (res.success) {
      onRefresh();
    } else {
      alert(res.error);
    }
  }

  return (
    <div className="py-2 border-b border-border-light dark:border-border-dark last:border-b-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="font-medium text-sm text-text-light dark:text-text-dark">
            {node.name}
          </span>
          <SubtopicIdBadge id={node.id} />
          <span className="text-[11px] text-secondary-light dark:text-secondary-dark">
            ({node.blogCount} articles)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onAddSubtopic(node.id, node.name)}
            className="text-xs px-2 py-1 rounded border border-border-light dark:border-border-dark hover:bg-surface-light dark:hover:bg-surface-dark"
          >
            + Subtopic
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="text-xs px-2 py-1 rounded text-red-600 border border-border-light dark:border-border-dark hover:bg-red-50 dark:hover:bg-red-950"
          >
            Delete
          </button>
        </div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="pl-6 border-l-2 border-border-light dark:border-border-dark mt-2 space-y-1">
          {node.children.map((child) => (
            <AdminTopicNode
              key={child.id}
              node={child}
              onAddSubtopic={onAddSubtopic}
              onRefresh={onRefresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}
