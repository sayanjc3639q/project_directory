/**
 * @file src/components/layout/Footer.tsx
 * @purpose Footer component with copyright, accessibility links, and minimal navigation.
 * @tags layout, footer, links, copyright
 */
import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark py-8 text-sm text-secondary-light dark:text-secondary-dark mt-auto">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span>© {new Date().getFullYear()} Bilbili. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/rss.xml" className="hover:text-text-light dark:hover:text-text-dark">
            RSS
          </Link>
          <Link href="/admin/login" className="hover:text-text-light dark:hover:text-text-dark">
            Admin
          </Link>
        </div>
      </Container>
    </footer>
  );
}
