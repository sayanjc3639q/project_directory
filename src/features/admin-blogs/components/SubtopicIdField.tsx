/**
 * @file src/features/admin-blogs/components/SubtopicIdField.tsx
 * @purpose Subtopic 6-character ID input that validates on blur and shows resolved path.
 * @tags admin, blog, subtopic, validation, path
 */
"use client";

import React, { useState } from "react";
import { resolveSubtopicAction } from "../server/resolveSubtopic.action";

export interface SubtopicIdFieldProps {
  value: string;
  resolvedPath: string;
  onChange: (id: string, resolvedPath: string) => void;
}

export function SubtopicIdField({
  value,
  resolvedPath,
  onChange,
}: SubtopicIdFieldProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleBlur() {
    if (!value || value.length !== 6) {
      setError("Subtopic ID must be exactly 6 characters");
      return;
    }

    setLoading(true);
    setError(null);
    const res = await resolveSubtopicAction(value);
    setLoading(false);

    if (res.success && res.data) {
      const fullPath = res.data.nameChain.join(" > ");
      onChange(value, fullPath);
    } else {
      setError(res.error || "Failed to resolve ID");
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase">
        Subtopic ID (6-character code)
      </label>
      <input
        type="text"
        required
        maxLength={6}
        value={value}
        onChange={(e) => onChange(e.target.value.trim(), resolvedPath)}
        onBlur={handleBlur}
        placeholder="e.g. A1b2C3"
        className="w-full max-w-xs px-3 py-2 text-sm font-mono border border-border-light dark:border-border-dark rounded bg-bg-light dark:bg-bg-dark"
      />
      {loading && <div className="text-xs text-secondary-light">Resolving path...</div>}
      {error && <div className="text-xs text-red-600 dark:text-red-400">{error}</div>}
      {resolvedPath && !error && (
        <div className="text-xs text-accent font-medium">
          Resolved: {resolvedPath}
        </div>
      )}
    </div>
  );
}
