/**
 * @file src/features/admin-topics/components/AdminTopicTree.tsx
 * @purpose Admin topic tree container rendering nested hierarchy and create actions.
 * @tags admin, topics, tree, hierarchy
 */
"use client";

import React, { useState } from "react";
import type { TopicTreeNode } from "@/types/topic";
import { AdminTopicNode } from "./AdminTopicNode";
import { TopicForm } from "./TopicForm";
import { Button } from "@/components/ui/Button";

export function AdminTopicTree({
  initialTree,
}: {
  initialTree: TopicTreeNode[];
}) {
  const [tree] = useState<TopicTreeNode[]>(initialTree);
  const [formTarget, setFormTarget] = useState<{
    parentId: string | null;
    parentName?: string;
  } | null>(null);

  function handleRefresh() {
    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Topic Hierarchy</h2>
        <Button
          size="sm"
          onClick={() => setFormTarget({ parentId: null })}
        >
          + Add Main Topic
        </Button>
      </div>

      {formTarget && (
        <TopicForm
          parentId={formTarget.parentId}
          parentName={formTarget.parentName}
          onSuccess={() => {
            setFormTarget(null);
            handleRefresh();
          }}
          onCancel={() => setFormTarget(null)}
        />
      )}

      <div className="border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark p-4">
        {tree.length === 0 ? (
          <p className="text-xs text-secondary-light dark:text-secondary-dark italic">
            No topics created yet. Click "+ Add Main Topic" to begin.
          </p>
        ) : (
          tree.map((node) => (
            <AdminTopicNode
              key={node.id}
              node={node}
              onAddSubtopic={(id, name) => setFormTarget({ parentId: id, parentName: name })}
              onRefresh={handleRefresh}
            />
          ))
        )}
      </div>
    </div>
  );
}
