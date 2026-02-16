"use client";

import { useState, useMemo } from "react";

interface Article {
  title: string;
  author: string;
  source: string;
  year: string;
  url: string;
  chapter: string;
  source_type: string;
}

const CHAPTER_NAMES: Record<string, string> = {
  "distribution-101": "Ch 1: Distribution 101",
  "hotel-technology": "Ch 2: Hotel Technology",
  "value-of-a-guest": "Ch 3: Value of a Guest",
  "digital-direct": "Ch 4: Digital Direct",
  "group-bookings": "Ch 5: Group Bookings",
  "voice-and-walk-in": "Ch 6: Voice & Walk-In",
  "loyalty-and-personalization": "Ch 7: Loyalty",
  "otas-deep-dive": "Ch 8: OTAs",
  "wholesale-deep-dive": "Ch 9: Wholesale",
  "metasearch-deep-dive": "Ch 10: Metasearch",
  "sharing-economy": "Ch 11: Sharing Economy",
  "social-media-super-apps-ai": "Ch 12: Social & AI",
  "future-tech-stack": "Ch 13: Future Tech",
};

const SOURCE_TYPES = ["All", "Research", "Industry", "Skift", "News", "Consulting", "PhocusWire"];

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export default function NewsGrid({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesQuery =
        !query ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.author.toLowerCase().includes(query.toLowerCase()) ||
        a.source.toLowerCase().includes(query.toLowerCase());
      const matchesSource = sourceFilter === "All" || a.source_type === sourceFilter;
      return matchesQuery && matchesSource;
    });
  }, [articles, query, sourceFilter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                       placeholder:text-text-muted"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SOURCE_TYPES.map((type) => {
            const count = type === "All" ? articles.length : articles.filter((a) => a.source_type === type).length;
            if (count === 0 && type !== "All") return null;
            return (
              <button
                key={type}
                onClick={() => setSourceFilter(type)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  sourceFilter === type
                    ? "bg-brand-600 text-white"
                    : "bg-white text-text-secondary border border-border hover:bg-slate-50"
                }`}
              >
                {type} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-text-muted">{filtered.length} articles</p>

      {/* Article list */}
      <div className="space-y-2">
        {filtered.map((a, i) => (
          <a
            key={`${a.url}-${i}`}
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 bg-white border border-border rounded-lg px-5 py-4 hover:border-brand-300 hover:shadow-md hover:shadow-brand-500/5 transition-all"
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-sm text-text-primary group-hover:text-brand-600 transition-colors leading-snug">
                {a.title}
              </h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-text-muted">
                {a.author && <span>{a.author}</span>}
                {a.year && <span>{a.year}</span>}
                <span className="text-text-muted/60">{getDomain(a.url)}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="inline-flex px-2 py-0.5 rounded bg-slate-100 text-[11px] font-medium text-text-secondary">
                  {a.source_type}
                </span>
                <span className="inline-flex px-2 py-0.5 rounded bg-brand-50 text-[11px] font-medium text-brand-600">
                  {CHAPTER_NAMES[a.chapter] || a.chapter}
                </span>
              </div>
            </div>
            <svg
              className="w-4 h-4 text-text-muted mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white border border-border rounded-lg p-8 text-center">
            <p className="text-sm text-text-muted">No articles match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
