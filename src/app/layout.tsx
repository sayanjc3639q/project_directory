/**
 * @file src/app/layout.tsx
 * @purpose Root application layout with theme init script and global font setup.
 * @tags layout, root, html, theme
 */
import type { Metadata } from "next";
import "@/styles/globals.css";
import { themeInitScript } from "@/features/theme";

export const metadata: Metadata = {
  title: "Bilbili",
  description: "Educational and informative blog website",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark antialiased"
      >
        {children}
      </body>
    </html>
  );
}
