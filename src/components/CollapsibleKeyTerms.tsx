"use client";

import { useState } from "react";

export default function CollapsibleKeyTerms({ html }: { html: string }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-t border-border-light pt-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-900 transition-colors uppercase tracking-wider"
        aria-expanded={open}
        aria-controls="key-terms-list"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
        </svg>
        <span>Key Terms</span>
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
        <div id="key-terms-list" className="mt-4" dangerouslySetInnerHTML={{ __html: html.replace(/className=/g, 'class=').replace(/\*\*(.+?)\*\*/g, '$1') }} />
      )}
    </div>
  );
}
