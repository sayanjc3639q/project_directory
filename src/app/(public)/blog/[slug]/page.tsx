/**
 * @file src/app/(public)/blog/[slug]/page.tsx
 * @purpose Public blog article page with TOC, header, body, references, and prev/next links.
 * @tags blog, page, server-component, article
 */
import { notFound } from "next/navigation";
import {
  getBlogBySlug,
  getPrevNextBlogs,
  BlogHeader,
  BlogBody,
  ReferencesList,
  Acknowledgement,
  PrevNextLinks,
  extractHeadings,
} from "@/features/blogs";
import { TableOfContents, ReadingProgress } from "@/features/toc";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const headings = extractHeadings(blog.blocks);
  const { prev, next } = await getPrevNextBlogs(
    blog.subtopicId,
    blog.publishedAt || blog.createdAt
  );

  return (
    <>
      <ReadingProgress />
      <div className="flex justify-center gap-10">
        <article className="w-full max-w-reading">
          <BlogHeader blog={blog} />
          <BlogBody blocks={blog.blocks} />
          <ReferencesList references={blog.references} />
          <Acknowledgement text={blog.acknowledgement} />
          <PrevNextLinks prev={prev} next={next} />
        </article>
        <TableOfContents headings={headings} />
      </div>
    </>
  );
}
