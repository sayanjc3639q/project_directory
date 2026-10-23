/**
 * @file src/features/topics/components/Breadcrumbs.tsx
 * @purpose Accessible breadcrumb navigation trail for hierarchical topic and blog pages.
 * @tags topics, breadcrumbs, navigation, accessibility
 */
import React from "react";
import Link from "next/link";
import { buildBreadcrumbs } from "../lib/buildBreadcrumbs";

export interface BreadcrumbsProps {
  slugPath: string[];
  nameChain: string[];
}

export function Breadcrumbs({ slugPath, nameChain }: BreadcrumbsProps) {
  const segments = buildBreadcrumbs(slugPath, nameChain);

  return (
    <nav aria-label="Breadcrumbs" className="mb-4 text-xs sm:text-sm text-secondary-light dark:text-secondary-dark">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-text-light dark:hover:text-text-dark">
            Home
          </Link>
        </li>
        {segments.map((seg) => (
          <li key={seg.href} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="text-border-light dark:text-border-dark">/</span>
            {seg.isLast ? (
              <span className="font-semibold text-text-light dark:text-text-dark" aria-current="page">
                {seg.name}
              </span>
            ) : (
              <Link href={seg.href} className="hover:text-text-light dark:hover:text-text-dark">
                {seg.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
