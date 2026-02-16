"use client";

import { ChapterSection } from "@/lib/chapters";
import { useState } from "react";

export default function TableOfContents({
  sections,
}: {
  sections: ChapterSection[];
}) {
  const [open, setOpen] = useState(true);

  const endSections = ["Chapter Summary", "Discussion Questions", "Key Terms", "References"];
  const filtered = sections.filter(
    (s) =>
      ((/^\d+\.\d+/.test(s.title) || s.title.includes("Industry Spotlight")) &&
      !s.title.includes("Opening Vignette")) ||
      endSections.includes(s.title)
  );

  if (filtered.length === 0) return null;

  return (
    <div className="not-prose mb-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-900 transition-colors"
        aria-expanded={open}
        aria-controls="toc-list"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 6.75h12M8.25 12h12M8.25 17.25h12M3.75 6.75h.007v.008H3.75V6.75zm0 5.25h.007v.008H3.75V12zm0 5.25h.007v.008H3.75v-.008z" />
        </svg>
        <span>Sections</span>
        <svg
          className={`w-3.5 h-3.5 text-brand-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <nav id="toc-list" className="mt-4 pl-1 border-l-2 border-brand-100">
          <ol className="space-y-0.5">
            {filtered.map((s, i) => (
              <li key={`${s.id}-${i}`}>
                <a
                  href={`#${s.id}`}
                  className={`block py-1.5 text-sm transition-colors hover:text-brand-600 ${
                    s.level === 3
                      ? "pl-6 text-text-muted"
                      : "pl-3 text-text-secondary font-medium"
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
