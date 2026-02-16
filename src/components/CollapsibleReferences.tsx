"use client";

import { useState } from "react";

export default function CollapsibleReferences({ references }: { references: string }) {
  const [open, setOpen] = useState(false);

  const lines = references.split("\n").filter((l) => l.trim());

  return (
    <div className="border-t border-border-light pt-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-900 transition-colors uppercase tracking-wider"
        aria-expanded={open}
        aria-controls="references-list"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <span>References</span>
        <svg
          className={`w-3.5 h-3.5 text-brand-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <span className="text-xs text-text-muted font-normal normal-case tracking-normal">({lines.length})</span>
      </button>
      {open && (
        <div id="references-list" className="mt-4 space-y-2">
          {lines.map((line, i) => (
            <p
              key={i}
              className="text-[13px] text-text-muted leading-relaxed pl-3 border-l-2 border-gray-100"
              dangerouslySetInnerHTML={{
                __html: line
                  .replace(/\*(.+?)\*/g, "<em>$1</em>")
                  .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-brand-600 hover:underline break-all">$1</a>'),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
