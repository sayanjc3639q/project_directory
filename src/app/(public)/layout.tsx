/**
 * @file src/app/(public)/layout.tsx
 * @purpose Public pages layout wrapping header, sidebar shell, footer, and PublicStoreProvider.
 * @tags layout, public, provider, shell
 */
import React from "react";
import { PublicStoreProvider } from "@/store/PublicStoreProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Container } from "@/components/ui/Container";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicStoreProvider>
      <div className="flex min-h-screen flex-col">
        <SkipLink />
        <Header />
        <Container className="flex-1 py-8" id="main-content">
          {children}
        </Container>
        <Footer />
      </div>
    </PublicStoreProvider>
  );
}
