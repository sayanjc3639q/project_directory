/**
 * @file src/features/blogs/lib/parseInline.tsx
 * @purpose Safely parses inline markdown syntax (**bold**, *italic*, [label](url)) to React nodes.
 * @tags blogs, markdown, parseInline, xss-safe
 */
import React from "react";

export function parseInline(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold **text**
      elements.push(<strong key={`b-${match.index}`}>{match[2]}</strong>);
    } else if (match[3]) {
      // Italic *text*
      elements.push(<em key={`i-${match.index}`}>{match[3]}</em>);
    } else if (match[4] && match[5]) {
      // Link [label](url)
      elements.push(
        <a
          key={`a-${match.index}`}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline hover:text-accent-hover"
        >
          {match[4]}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : [text];
}
