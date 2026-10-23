/**
 * @file src/app/(public)/blog/[slug]/loading.tsx
 * @purpose Skeleton loading placeholder for public blog article page.
 * @tags blog, loading, skeleton, suspense
 */
export default function BlogLoading() {
  return (
    <div className="max-w-reading mx-auto animate-pulse">
      <div className="h-4 w-40 bg-border-light dark:bg-border-dark rounded mb-6" />
      <div className="h-10 w-3/4 bg-border-light dark:bg-border-dark rounded mb-4" />
      <div className="h-4 w-32 bg-border-light dark:bg-border-dark rounded mb-8" />
      <div className="space-y-4">
        <div className="h-4 w-full bg-surface-light dark:bg-surface-dark rounded" />
        <div className="h-4 w-full bg-surface-light dark:bg-surface-dark rounded" />
        <div className="h-4 w-5/6 bg-surface-light dark:bg-surface-dark rounded" />
      </div>
    </div>
  );
}
