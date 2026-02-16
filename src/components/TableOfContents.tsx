"use client";

import { ChapterSection } from "@/lib/chapters";
import { useState } from "react";

export default function TableOfContents({
  sections,
}: {
  sections: ChapterSection[];
}) {
  const [open, setOpen] = useState(true);

  // Only show numbered sections (e.g., "1.1 ...", "10.2 ...") + spotlights
  const filtered = sections.filter(
    (s) =>
      (/^\d+\.\d+/.test(s.title) || s.title.includes("Industry Spotlight")) &&
      !s.title.includes("Opening Vignette")
  );

  if (filtered.length === 0) return null;

  return (
    <div className="not-prose mb-10 bg-slate-50 border border-border rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm font-semibold text-text-primary"
      >
        <span>Table of Contents</span>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <nav className="px-5 pb-4">
          <ol className="space-y-1">
            {filtered.map((s, i) => (
              <li key={`${s.id}-${i}`}>
                <a
                  href={`#${s.id}`}
                  className={`block py-1 text-sm transition-colors hover:text-brand-600 ${
                    s.level === 3
                      ? "pl-4 text-text-muted"
                      : "text-text-secondary font-medium"
                  }`}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </div>
  );
}
