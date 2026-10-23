/**
 * @file src/features/admin-topics/index.ts
 * @purpose Public feature exports for admin topics hierarchy and management.
 * @tags admin, topics, barrel, exports
 */
export { TopicsManager } from "./components/TopicsManager";
export { AdminTopicTree } from "./components/AdminTopicTree";
export { AdminTopicNode } from "./components/AdminTopicNode";
export { TopicForm } from "./components/TopicForm";
export { SubtopicIdBadge } from "./components/SubtopicIdBadge";

export { createTopicAction } from "./server/createTopic.action";
export { renameTopicAction } from "./server/renameTopic.action";
export { deleteTopicAction } from "./server/deleteTopic.action";
export { rebuildTopicTree } from "./server/rebuildTopicTree";
export { afterTopicChange } from "./server/afterTopicChange";
