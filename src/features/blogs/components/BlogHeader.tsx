/**
 * @file src/features/blogs/components/BlogHeader.tsx
 * @purpose Renders blog article header with title, reading time, date, and tags.
 * @tags blogs, header, metadata, reading-time
 */
import React from "react";
import type { Blog } from "@/types/blog";
import { Breadcrumbs } from "@/features/topics";

export interface BlogHeaderProps {
  blog: Blog;
}

export function BlogHeader({ blog }: BlogHeaderProps) {
  const dateStr = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Draft";

  return (
    <header className="mb-8">
      <Breadcrumbs
        slugPath={blog.topicPathKey.split("/").filter(Boolean)}
        nameChain={blog.topicNameChain}
      />
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-text-light dark:text-text-dark mb-3">
        {blog.title}
      </h1>
      <div className="flex flex-wrap items-center gap-4 text-xs text-secondary-light dark:text-secondary-dark">
        <time dateTime={blog.publishedAt || blog.createdAt}>{dateStr}</time>
        <span>•</span>
        <span>{blog.readingTime} min read</span>
      </div>
    </header>
  );
}
