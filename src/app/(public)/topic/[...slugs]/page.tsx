/**
 * @file src/app/(public)/topic/[...slugs]/page.tsx
 * @purpose Public topic page rendering breadcrumbs, subtopics, and matching blogs.
 * @tags topic, page, server-component, hierarchy
 */
import { notFound } from "next/navigation";
import { getTopicByPathKey, Breadcrumbs, ChildTopicList } from "@/features/topics";

interface TopicPageProps {
  params: Promise<{ slugs: string[] }>;
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slugs } = await params;
  const pathKey = slugs.join("/");
  const topic = await getTopicByPathKey(pathKey);

  if (!topic) {
    notFound();
  }

  return (
    <article className="max-w-reading mx-auto">
      <Breadcrumbs slugPath={topic.slugPath} nameChain={topic.nameChain} />
      <h1 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark mb-4">
        {topic.name}
      </h1>
      <ChildTopicList childrenNodes={[]} />
      <section className="mt-8 border-t border-border-light dark:border-border-dark pt-6">
        <p className="text-sm text-secondary-light dark:text-secondary-dark">
          {topic.blogCount} published articles in this topic.
        </p>
      </section>
    </article>
  );
}
