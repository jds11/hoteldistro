import Link from "next/link";
import { getAllChapters } from "@/lib/chapters";
import { getPartColors } from "@/lib/part-colors";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const parts = [
  { title: "Part I", subtitle: "Introduction", range: [1, 3] },
  { title: "Part II", subtitle: "Direct Channels", range: [4, 7] },
  { title: "Part III", subtitle: "Indirect Channels", range: [8, 10] },
  { title: "Part IV", subtitle: "Future of Distribution", range: [11, 13] },
];

export default function Home() {
  const chapters = getAllChapters();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />

      {/* Hero */}
      <header className="bg-white" role="banner">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-32 md:py-28">
          <p className="text-brand-600 text-sm font-semibold tracking-wide mb-6 md:mb-5">
            NYU Tisch Center for Hospitality
          </p>
          <h1 className="max-w-2xl">
            <span className="block text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-brand-900 leading-[1.08]">
              Hotel Distribution
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-brand-600 mt-3 md:mt-2">
              Online Textbook
            </span>
          </h1>
          <p className="mt-6 md:mt-5 text-text-secondary text-base md:text-lg max-w-lg leading-relaxed">
            13 chapters on strategy, technology, and the channels that connect hotels to guests — written by industry practitioners for the next generation of hospitality leaders.
          </p>
          <div className="mt-10 md:mt-8 flex flex-wrap gap-3">
            <Link
              href="/chapters/distribution-101"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-900 text-white font-semibold text-sm rounded-full hover:bg-brand-800 transition-all shadow-md shadow-brand-900/20"
            >
              Start Reading
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 text-text-secondary font-medium text-sm rounded-full border border-border hover:bg-slate-50 transition-all"
            >
              About the Authors
            </Link>
          </div>
        </div>
      </header>

      {/* Chapters */}
      <main className="bg-surface" role="main">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full">
        {parts.map((part, partIdx) => {
          const partChapters = chapters.filter(
            (ch) => ch.number >= part.range[0] && ch.number <= part.range[1]
          );
          if (partChapters.length === 0) return null;

          return (
            <section
              key={part.title}
              className={`${partIdx === 0 ? "pt-16" : "pt-12"} pb-12 ${
                partIdx < parts.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-1">
                  {part.title}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                  {part.subtitle}
                </h2>
              </div>

              <div className="space-y-0 border-t border-border">
                {partChapters.map((ch) => {
                  const colors = getPartColors(ch.number);
                  return (
                    <Link
                      key={ch.slug}
                      href={`/chapters/${ch.slug}`}
                      className="flex items-center gap-5 py-5 border-b border-border hover:bg-white/60 transition-colors px-4 -mx-4 group"
                    >
                      <span className={`text-3xl font-bold tracking-tight ${colors.text} shrink-0 w-12`}>
                        {String(ch.number).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-text-primary text-lg leading-snug group-hover:text-brand-700 transition-colors">
                          {ch.title}
                        </h3>
                        <p className="text-sm text-text-muted mt-1 leading-relaxed">{ch.description}</p>
                      </div>
                      <svg className="w-5 h-5 text-text-muted shrink-0 group-hover:text-brand-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Bottom CTA */}
        <section className="py-16">
          <div className="bg-brand-900 rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Learn more
            </h2>
            <p className="text-brand-300 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              164 industry terms, insights from leading sources, and the people behind the book.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/glossary" className="px-6 py-3 bg-white text-brand-900 font-semibold text-sm rounded-full hover:bg-brand-50 transition-colors">
                Browse Glossary
              </Link>
              <Link href="/about" className="px-6 py-3 text-white font-medium text-sm rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                Meet the Authors
              </Link>
              <Link href="/contact" className="px-6 py-3 text-white font-medium text-sm rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
