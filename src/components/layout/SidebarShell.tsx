/**
 * @file src/components/layout/SidebarShell.tsx
 * @purpose Structural sidebar shell for desktop topic tree navigation.
 * @tags layout, sidebar, shell, desktop
 */
import React from "react";

export function SidebarShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <aside className="hidden lg:block w-[260px] flex-shrink-0 border-r border-border-light dark:border-border-dark p-4 self-start sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="text-xs font-semibold uppercase tracking-wider text-secondary-light dark:text-secondary-dark mb-3">
        Topics
      </div>
      {children}
    </aside>
  );
}
