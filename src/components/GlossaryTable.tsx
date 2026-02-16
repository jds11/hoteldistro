"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Term {
  term: string;
  definition: string;
  chapters: string;
}

interface Props {
  terms: Term[];
  anchors: Record<string, Record<string, string>>;
}

const CHAPTER_SLUGS: Record<number, string> = {
  1: "distribution-101",
  2: "hotel-technology",
  3: "value-of-a-guest",
  4: "digital-direct",
  5: "group-bookings",
  6: "voice-and-walk-in",
  7: "loyalty-and-personalization",
  8: "otas-deep-dive",
  9: "wholesale-deep-dive",
  10: "metasearch-deep-dive",
  11: "sharing-economy",
  12: "social-media-super-apps-ai",
  13: "future-tech-stack",
};

export default function GlossaryTable({ terms, anchors }: Props) {
  const [query, setQuery] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const letters = useMemo(() => {
    const set = new Set(terms.map((t) => t.term[0].toUpperCase()));
    return Array.from(set).sort();
  }, [terms]);

  const filtered = useMemo(() => {
    return terms.filter((t) => {
      const matchesQuery =
        !query ||
        t.term.toLowerCase().includes(query.toLowerCase()) ||
        t.definition.toLowerCase().includes(query.toLowerCase());
      const matchesLetter =
        !selectedLetter || t.term[0].toUpperCase() === selectedLetter;
      return matchesQuery && matchesLetter;
    });
  }, [terms, query, selectedLetter]);

  const parseChapters = (ch: string): number[] => {
    if (!ch) return [];
    return ch
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
  };

  return (
    <div className="space-y-5">
      {/* Search + letter filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedLetter(null);
            }}
            placeholder="Search terms or definitions…"
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-border rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
                       placeholder:text-text-muted"
          />
        </div>
        <p className="text-xs text-text-muted">
          {filtered.length} of {terms.length} terms
        </p>
      </div>

      {/* Alphabet bar */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setSelectedLetter(null)}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            !selectedLetter
              ? "bg-brand-600 text-white"
              : "bg-white text-text-secondary border border-border hover:bg-slate-50"
          }`}
        >
          All
        </button>
        {letters.map((l) => (
          <button
            key={l}
            onClick={() => {
              setSelectedLetter(l === selectedLetter ? null : l);
              setQuery("");
            }}
            className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
              selectedLetter === l
                ? "bg-brand-600 text-white"
                : "bg-white text-text-secondary border border-border hover:bg-slate-50"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="text-left px-3 sm:px-4 py-3 font-semibold text-text-primary min-w-[120px] sm:w-[200px]">
                  Term
                </th>
                <th className="text-left px-3 sm:px-4 py-3 font-semibold text-text-primary hidden sm:table-cell">
                  Definition
                </th>
                <th className="text-left px-3 sm:px-4 py-3 font-semibold text-text-primary w-[80px] sm:w-[120px]">
                  Ch.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {filtered.map((t) => (
                <tr key={t.term} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-3 sm:px-4 py-3 align-top">
                    <span className="font-medium text-text-primary">{t.term}</span>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed sm:hidden">
                      {t.definition}
                    </p>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-text-secondary leading-relaxed align-top hidden sm:table-cell">
                    {t.definition}
                  </td>
                  <td className="px-3 sm:px-4 py-3 align-top">
                    <div className="flex flex-wrap gap-1">
                      {parseChapters(t.chapters).map((n) => (
                        <Link
                          key={n}
                          href={`/chapters/${CHAPTER_SLUGS[n] || ""}#${anchors[t.term]?.[String(n)] || "key-terms"}`}
                          className="inline-flex items-center justify-center w-6 h-6 rounded bg-brand-50 text-brand-600 text-xs font-medium hover:bg-brand-100 transition-colors"
                          title={`Chapter ${n}`}
                        >
                          {n}
                        </Link>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-text-muted">
                    No terms match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
