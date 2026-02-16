"use client";

import { useState } from "react";
import Link from "next/link";
import { ChapterMeta, ChapterSection } from "@/lib/chapters";

interface Props {
  current: ChapterMeta;
  chapters: ChapterMeta[];
  sections: ChapterSection[];
}

export default function ChapterSubNav({ current, chapters, sections }: Props) {
  const [chapOpen, setChapOpen] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  const closeAll = () => { setChapOpen(false); setTocOpen(false); };

  return (
    <div className="sticky top-14 z-40 bg-white/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-11 gap-4">
          {/* Chapter selector */}
          <div className="relative min-w-0">
            <button
              onClick={() => { setChapOpen(!chapOpen); setTocOpen(false); }}
              className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-brand-700 transition-colors min-w-0"
            >
              <span className="text-text-muted text-xs font-mono shrink-0">
                {String(current.number).padStart(2, "0")}
              </span>
              <span className="truncate">{current.title}</span>
              <svg className={`w-3.5 h-3.5 text-text-muted shrink-0 transition-transform ${chapOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {chapOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={closeAll} />
                <div className="absolute top-full left-0 mt-1 z-50 w-72 sm:w-80 bg-white border border-border rounded-xl shadow-xl overflow-hidden">
                  <div className="max-h-[60vh] overflow-y-auto py-1">
                    {chapters.map((ch) => (
                      <Link
                        key={ch.slug}
                        href={`/chapters/${ch.slug}`}
                        onClick={closeAll}
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          ch.slug === current.slug
                            ? "bg-brand-50 text-brand-800 font-medium"
                            : "text-text-secondary hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-xs text-text-muted font-mono w-5 shrink-0">
                          {String(ch.number).padStart(2, "0")}
                        </span>
                        <span className="truncate">{ch.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sections dropdown — right aligned */}
          {sections.length > 0 && (
            <div className="relative shrink-0">
              <button
                onClick={() => { setTocOpen(!tocOpen); setChapOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-slate-50 text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-slate-100 hover:border-brand-200 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 6.75h12M8.25 12h12M8.25 17.25h12M3.75 6.75h.007v.008H3.75V6.75zm0 5.25h.007v.008H3.75V12zm0 5.25h.007v.008H3.75v-.008z" />
                </svg>
                <span className="hidden sm:inline">Sections</span>
              </button>

              {tocOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={closeAll} />
                  <div className="absolute top-full right-0 mt-1 z-50 w-72 sm:w-80 bg-white border border-border rounded-xl shadow-xl overflow-hidden">
                    <div className="max-h-[60vh] overflow-y-auto py-2">
                      {sections.map((s, i) => (
                        <a
                          key={`${s.id}-${i}`}
                          href={`#${s.id}`}
                          onClick={closeAll}
                          className={`block px-4 py-2 text-sm transition-colors hover:bg-slate-50 ${
                            s.level === 3
                              ? "pl-8 text-text-muted"
                              : "text-text-secondary font-medium"
                          }`}
                        >
                          {s.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
