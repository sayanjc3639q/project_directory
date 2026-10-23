/**
 * @file src/app/(public)/topic/[...slugs]/loading.tsx
 * @purpose Skeleton loading state for public topic pages.
 * @tags topic, loading, skeleton, suspense
 */
export default function TopicLoading() {
  return (
    <div className="max-w-reading mx-auto animate-pulse">
      <div className="h-4 w-48 bg-border-light dark:bg-border-dark rounded mb-6" />
      <div className="h-9 w-72 bg-border-light dark:bg-border-dark rounded mb-4" />
      <div className="h-4 w-32 bg-border-light dark:bg-border-dark rounded mb-8" />
      <div className="space-y-4 pt-6 border-t border-border-light dark:border-border-dark">
        <div className="h-20 bg-surface-light dark:bg-surface-dark rounded" />
        <div className="h-20 bg-surface-light dark:bg-surface-dark rounded" />
      </div>
    </div>
  );
}
