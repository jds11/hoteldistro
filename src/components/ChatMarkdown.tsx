"use client";

import ReactMarkdown from "react-markdown";

export default function ChatMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <p className="font-bold text-base mt-2 mb-1">{children}</p>,
        h2: ({ children }) => <p className="font-bold text-base mt-2 mb-1">{children}</p>,
        h3: ({ children }) => <p className="font-bold text-sm mt-2 mb-1">{children}</p>,
        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70">
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="bg-black/10 rounded px-1 py-0.5 text-xs font-mono">{children}</code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
