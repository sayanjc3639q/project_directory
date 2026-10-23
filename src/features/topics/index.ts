/**
 * @file src/features/topics/index.ts
 * @purpose Public feature exports for topics modules and components.
 * @tags topics, barrel, exports
 */
export { TopicCard } from "./components/TopicCard";
export { TopicCardGrid } from "./components/TopicCardGrid";
export { TopicTree } from "./components/TopicTree";
export { TopicTreeNode } from "./components/TopicTreeNode";
export { Breadcrumbs } from "./components/Breadcrumbs";
export { ChildTopicList } from "./components/ChildTopicList";

export { getTopicTree } from "./server/getTopicTree";
export { getTopicByPathKey } from "./server/getTopicByPathKey";
export { getTopicById } from "./server/getTopicById";

export { buildBreadcrumbs } from "./lib/buildBreadcrumbs";
export { flattenTopicTree } from "./lib/flattenTree";
