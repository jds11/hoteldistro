"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Chapters" },
  { href: "/glossary", label: "Glossary" },
  // { href: "/news", label: "News" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isChapter = pathname.startsWith("/chapters/");

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${
      isChapter ? "bg-white/95 border-border/50" : "bg-white/90 border-border"
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="6" fill="#102a43" />
            <text x="14" y="18.5" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">HD</text>
          </svg>
          <span className="font-semibold text-text-primary text-sm tracking-tight hidden sm:inline">
            Hotel Distribution
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-0.5">
          {links.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-800"
                    : "text-text-muted hover:text-text-primary hover:bg-slate-50"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2 text-text-secondary"
          aria-label="Menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1">
          {links.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-brand-50 text-brand-800"
                    : "text-text-secondary hover:bg-slate-50"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
