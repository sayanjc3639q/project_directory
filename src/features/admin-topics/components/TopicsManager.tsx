/**
 * @file src/features/admin-topics/components/TopicsManager.tsx
 * @purpose Admin topic manager wrapper coordinating tree state and CRUD forms.
 * @tags admin, topics, manager, coordinator
 */
"use client";

import React from "react";
import type { TopicTreeNode } from "@/types/topic";
import { AdminTopicTree } from "./AdminTopicTree";

export function TopicsManager({ tree }: { tree: TopicTreeNode[] }) {
  return (
    <div className="max-w-4xl mx-auto py-6">
      <AdminTopicTree initialTree={tree} />
    </div>
  );
}
