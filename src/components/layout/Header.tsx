/**
 * @file src/components/layout/Header.tsx
 * @purpose Top site navigation header with branding, search trigger, and theme toggle.
 * @tags layout, header, navigation, brand
 */
import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/features/theme";
import { SearchBar } from "@/features/search";

export function Header() {
  return (
    <header className="border-b border-border-light dark:border-border-dark bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur sticky top-0 z-40">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-accent text-white font-bold flex items-center justify-center text-sm shadow-sm group-hover:bg-accent-hover transition-colors">
              B
            </span>
            <span className="font-extrabold text-lg tracking-tight text-text-light dark:text-text-dark">
              Bilbili
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-secondary-light dark:text-secondary-dark">
            <Link href="/" className="hover:text-text-light dark:hover:text-text-dark transition-colors">
              Explore
            </Link>
            <Link href="/saved" className="hover:text-text-light dark:hover:text-text-dark transition-colors">
              Library
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
