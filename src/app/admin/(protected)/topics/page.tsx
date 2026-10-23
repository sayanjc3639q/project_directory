/**
 * @file src/app/admin/(protected)/topics/page.tsx
 * @purpose Admin topic manager page fetching topic tree and rendering manager UI.
 * @tags admin, topics, manager, page
 */
import React from "react";
import { getTopicTree } from "@/features/topics";
import { TopicsManager } from "@/features/admin-topics";

export default async function AdminTopicsPage() {
  const tree = await getTopicTree();

  return (
    <div className="w-full">
      <TopicsManager tree={tree} />
    </div>
  );
}
