/**
 * @file src/features/admin-blogs/components/SaveBar.tsx
 * @purpose Admin save bar with draft status indicator, publish, and save draft buttons.
 * @tags admin, blog, save, publish, bar
 */
"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export interface SaveBarProps {
  dirty: boolean;
  status: "draft" | "published";
  loading: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export function SaveBar({
  dirty,
  status,
  loading,
  onSaveDraft,
  onPublish,
}: SaveBarProps) {
  return (
    <div className="flex items-center justify-between border-t border-border-light dark:border-border-dark pt-4 mt-8">
      <div className="text-xs text-secondary-light dark:text-secondary-dark flex items-center gap-2">
        <span>Status: <strong className="capitalize">{status}</strong></span>
        {dirty && <span className="text-yellow-600 font-semibold">• Unsaved changes</span>}
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={loading}
          onClick={onSaveDraft}
        >
          {loading ? "Saving..." : "Save Draft"}
        </Button>
        <Button
          type="button"
          size="sm"
          disabled={loading}
          onClick={onPublish}
        >
          {status === "published" ? "Update Published" : "Publish Blog"}
        </Button>
      </div>
    </div>
  );
}
