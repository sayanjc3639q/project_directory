/**
 * @file src/app/(public)/page.tsx
 * @purpose Home page rendering search bar, main topic cards, and latest published blogs.
 * @tags home, public, page, topics, blogs
 */
import React from "react";
import Link from "next/link";
import { getTopicTree, TopicCardGrid } from "@/features/topics";
import { getLatestBlogs } from "@/features/blogs";

export default async function HomePage() {
  const tree = await getTopicTree();
  const latestBlogs = await getLatestBlogs(10);

  return (
    <div className="space-y-16 py-6">
      <section className="text-center py-12 max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-secondary-light dark:text-secondary-dark">
          <span className="w-2 h-2 rounded-full bg-accent" />
          The Educational & Research Knowledge Base
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text-light dark:text-text-dark leading-tight">
          Explore science, technology, and engineering concepts.
        </h1>
        <p className="text-base text-secondary-light dark:text-secondary-dark leading-relaxed max-w-xl mx-auto">
          High-yield, peer-reviewed educational articles structured with clean formulas, code snippets, and hierarchical concept maps.
        </p>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-border-light dark:border-border-dark">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Browse Topics</h2>
            <p className="text-xs text-secondary-light dark:text-secondary-dark mt-0.5">Explore by academic subject</p>
          </div>
        </div>
        <TopicCardGrid topics={tree} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-border-light dark:border-border-dark">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Latest Articles</h2>
            <p className="text-xs text-secondary-light dark:text-secondary-dark mt-0.5">Freshly published insights</p>
          </div>
        </div>
        {latestBlogs.length === 0 ? (
          <div className="p-12 border border-dashed border-border-light dark:border-border-dark rounded-xl text-center text-xs text-secondary-light">
            No published articles yet. Seed sample data or publish from the admin panel!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {latestBlogs.map((b) => (
              <article
                key={b.id}
                className="p-6 border border-border-light dark:border-border-dark rounded-xl bg-surface-light dark:bg-surface-dark hover:border-accent hover:shadow-sm transition-all"
              >
                <div className="text-[11px] font-semibold uppercase tracking-wider text-accent dark:text-accent-dark mb-2">
                  {b.topicNameChain.join(" / ")}
                </div>
                <Link href={`/blog/${b.slug}`} className="font-bold text-lg hover:underline text-text-light dark:text-text-dark line-clamp-2">
                  {b.title}
                </Link>
                <p className="text-xs text-secondary-light dark:text-secondary-dark mt-2.5 line-clamp-2 leading-relaxed">
                  {b.excerpt}
                </p>
                <div className="mt-5 pt-3 border-t border-border-light dark:border-border-dark flex items-center justify-between text-[11px] text-secondary-light">
                  <span className="font-medium">{b.readingTime} min read</span>
                  <time dateTime={b.publishedAt}>{new Date(b.publishedAt).toLocaleDateString()}</time>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
