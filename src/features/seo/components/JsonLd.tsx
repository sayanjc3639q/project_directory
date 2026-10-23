/**
 * @file src/features/seo/components/JsonLd.tsx
 * @purpose Injects sanitized application/ld+json script into document head.
 * @tags seo, json-ld, script, structured-data
 */
import React from "react";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
