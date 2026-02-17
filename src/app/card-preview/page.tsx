import { getAllChapters } from "@/lib/chapters";
import { getPartColors } from "@/lib/part-colors";
import Link from "next/link";

export const metadata = { title: "Card Preview — Hotel Distribution" };

export default function CardPreviewPage() {
  const chapters = getAllChapters().slice(0, 3); // Just Part I for preview

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-20">

        {/* ============ OPTION A: Clean List Rows ============ */}
        <section>
          <div className="mb-2 px-3 py-1 bg-brand-900 text-white text-xs font-bold uppercase tracking-widest rounded inline-block">Option A</div>
          <h2 className="text-2xl font-bold text-text-primary mt-2 mb-1">Clean List Rows</h2>
          <p className="text-sm text-text-muted mb-6">Editorial table-of-contents style. Minimal, fast to scan.</p>
          
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-1">Part I</p>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Introduction</h3>
          </div>
          <div className="space-y-0 border-t border-border">
            {chapters.map((ch) => {
              const colors = getPartColors(ch.number);
              return (
                <div key={ch.slug} className="flex items-start gap-5 py-5 border-b border-border hover:bg-white/60 transition-colors px-4 -mx-4 cursor-pointer">
                  <span className={`text-3xl font-bold tracking-tight ${colors.text} shrink-0 w-12`}>
                    {String(ch.number).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-text-primary text-[15px] leading-snug">{ch.title}</h4>
                    <p className="text-sm text-text-muted mt-1 leading-relaxed">{ch.description}</p>
                  </div>
                  <svg className="w-5 h-5 text-text-muted shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============ OPTION B: Full-Color Cards ============ */}
        <section>
          <div className="mb-2 px-3 py-1 bg-brand-900 text-white text-xs font-bold uppercase tracking-widest rounded inline-block">Option B</div>
          <h2 className="text-2xl font-bold text-text-primary mt-2 mb-1">Full-Color Cards</h2>
          <p className="text-sm text-text-muted mb-6">Immersive navy cards. Google Learn course-card energy.</p>

          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-1">Part I</p>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Introduction</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch) => {
              const colors = getPartColors(ch.number);
              return (
                <div key={ch.slug} className={`group relative rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${colors.card} p-6 flex flex-col justify-between min-h-[200px]`}>
                  <div>
                    <span className="text-white/20 text-5xl font-bold tracking-tight block mb-4">
                      {String(ch.number).padStart(2, "0")}
                    </span>
                    <h4 className="font-bold text-white text-lg leading-snug">{ch.title}</h4>
                    <p className="text-white/60 text-sm mt-2 leading-relaxed line-clamp-2">{ch.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============ OPTION C: Left-Accent Cards ============ */}
        <section>
          <div className="mb-2 px-3 py-1 bg-brand-900 text-white text-xs font-bold uppercase tracking-widest rounded inline-block">Option C</div>
          <h2 className="text-2xl font-bold text-text-primary mt-2 mb-1">Left-Accent Cards</h2>
          <p className="text-sm text-text-muted mb-6">Clean white cards with colored left border. Modern, Notion-like.</p>

          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-1">Part I</p>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Introduction</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch) => {
              const colors = getPartColors(ch.number);
              return (
                <div key={ch.slug} className={`group bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 ${colors.borderLeft}`}>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${colors.pill}`}>
                        Ch {ch.number}
                      </span>
                    </div>
                    <h4 className="font-bold text-text-primary text-[15px] leading-snug group-hover:text-brand-700 transition-colors">
                      {ch.title}
                    </h4>
                    <p className="text-sm text-text-muted mt-2 leading-relaxed line-clamp-2">{ch.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============ OPTION D: Compact Horizontal ============ */}
        <section>
          <div className="mb-2 px-3 py-1 bg-brand-900 text-white text-xs font-bold uppercase tracking-widest rounded inline-block">Option D</div>
          <h2 className="text-2xl font-bold text-text-primary mt-2 mb-1">Compact Horizontal</h2>
          <p className="text-sm text-text-muted mb-6">Dense, scannable rows with badge numbers. Course syllabus feel.</p>

          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-1">Part I</p>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Introduction</h3>
          </div>
          <div className="space-y-2">
            {chapters.map((ch) => {
              const colors = getPartColors(ch.number);
              return (
                <div key={ch.slug} className="group flex items-center gap-4 bg-white rounded-xl border border-border p-4 hover:shadow-md hover:border-brand-200 transition-all cursor-pointer">
                  <div className={`w-10 h-10 rounded-lg ${colors.card} flex items-center justify-center shrink-0`}>
                    <span className="text-white font-bold text-sm">{ch.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-text-primary text-sm leading-snug group-hover:text-brand-700 transition-colors">{ch.title}</h4>
                    <p className="text-xs text-text-muted mt-0.5 leading-relaxed truncate">{ch.description}</p>
                  </div>
                  <svg className="w-4 h-4 text-text-muted shrink-0 group-hover:text-brand-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              );
            })}
          </div>
        </section>

        {/* ============ OPTION E: Magazine Staggered ============ */}
        <section>
          <div className="mb-2 px-3 py-1 bg-brand-900 text-white text-xs font-bold uppercase tracking-widest rounded inline-block">Option E</div>
          <h2 className="text-2xl font-bold text-text-primary mt-2 mb-1">Magazine Staggered</h2>
          <p className="text-sm text-text-muted mb-6">First chapter featured large, rest in grid. Editorial variety.</p>

          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-500 mb-1">Part I</p>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">Introduction</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chapters.map((ch, i) => {
              const colors = getPartColors(ch.number);
              const isFeatured = i === 0;
              return (
                <div
                  key={ch.slug}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${
                    isFeatured ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  <div className={`${colors.card} ${isFeatured ? "p-8 min-h-[240px]" : "p-6 min-h-[200px]"} flex flex-col justify-end`}>
                    <span className="text-white/15 text-6xl font-bold tracking-tight absolute top-4 right-6">
                      {String(ch.number).padStart(2, "0")}
                    </span>
                    <div className="relative z-10">
                      <h4 className={`font-bold text-white leading-snug ${isFeatured ? "text-2xl" : "text-lg"}`}>{ch.title}</h4>
                      <p className={`text-white/60 mt-2 leading-relaxed ${isFeatured ? "text-base line-clamp-3" : "text-sm line-clamp-2"}`}>{ch.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
