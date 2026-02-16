import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getChapterBySlug,
  getAllChapters,
  getChapterSections,
  extractVignette,
  extractIntroTitle,
} from "@/lib/chapters";
import { getPartColors } from "@/lib/part-colors";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChapterSubNav from "@/components/ChapterSubNav";
import TableOfContents from "@/components/TableOfContents";
import { mdxComponents } from "@/components/MdxComponents";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllChapters().map((ch) => ({ slug: ch.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) return {};
  return { title: `${chapter.meta.title} — Hotel Distribution` };
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  if (!chapter) notFound();

  const chapters = getAllChapters();
  const idx = chapters.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;
  const colors = getPartColors(chapter.meta.number);

  // Extract intro title first, then vignette from remaining content
  const introTitleResult = extractIntroTitle(chapter.content);
  const afterTitle = introTitleResult ? introTitleResult.contentWithout : chapter.content;
  const vignetteResult = extractVignette(afterTitle);
  const displayContent = vignetteResult ? vignetteResult.contentWithout : afterTitle;
  const sections = getChapterSections(displayContent);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Nav />
      <ChapterSubNav current={chapter.meta} chapters={chapters} sections={sections} />

      {/* Chapter hero — color-coded by Part */}
      <div className={`bg-gradient-to-br ${colors.hero} text-white`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 md:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Chapters
          </Link>

          <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${colors.label}`}>
            Chapter {chapter.meta.number}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
            {chapter.meta.title}
          </h1>
          {chapter.meta.description && (
            <p className="mt-4 text-white/50 text-base md:text-lg max-w-xl leading-relaxed">
              {chapter.meta.description}
            </p>
          )}
        </div>
      </div>

      {/* Reading area */}
      <article className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <TableOfContents sections={sections} />

          {/* Intro title — standalone chapter title like "The Technology Stack That Powers Distribution" */}
          {introTitleResult && (
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mt-8 mb-6">
              {introTitleResult.introTitle}
            </h2>
          )}

          {/* Vignette callout */}
          {vignetteResult && (
            <div className="mb-10 bg-brand-50 border border-brand-100 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-brand-700 text-xs font-semibold uppercase tracking-wider">
                  Opening Vignette
                </span>
              </div>
              <div className="text-[15px] text-brand-900/80 leading-[1.8] space-y-4">
                {vignetteResult.vignette.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}

          <div
            className="prose max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-text-primary
              prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pt-8 prose-h2:border-t prose-h2:border-border-light
              prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
              prose-h4:text-base prose-h4:mt-6 prose-h4:font-semibold
              prose-p:text-[15px] prose-p:text-text-secondary prose-p:leading-[1.85]
              prose-li:text-[15px] prose-li:text-text-secondary prose-li:leading-[1.85]
              prose-strong:text-text-primary prose-strong:font-semibold
              prose-a:text-brand-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-brand-400 prose-blockquote:bg-brand-50/50 prose-blockquote:rounded-r-md prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-sm prose-blockquote:text-brand-900
              prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:shadow-md prose-img:my-8
              prose-table:text-sm prose-table:my-6
              prose-th:bg-slate-50 prose-th:font-semibold prose-th:text-text-primary prose-th:text-left prose-th:px-3 prose-th:py-2.5
              prose-td:px-3 prose-td:py-2.5 prose-td:align-top
              prose-hr:border-border-light prose-hr:my-10"
          >
            <MDXRemote source={displayContent} components={mdxComponents} />
          </div>
        </div>
      </article>

      {/* Prev / Next */}
      <div className="bg-slate-50 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prev && (
              <Link href={`/chapters/${prev.slug}`} className="group bg-white rounded-xl border border-border p-5 hover:border-brand-300 hover:shadow-lg transition-all">
                <span className="text-[11px] text-text-muted uppercase tracking-wider font-medium">← Previous</span>
                <p className="font-semibold text-sm text-text-primary group-hover:text-brand-700 transition-colors mt-1 leading-snug">{prev.title}</p>
              </Link>
            )}
            {!prev && <div />}
            {next && (
              <Link href={`/chapters/${next.slug}`} className="group bg-white rounded-xl border border-border p-5 hover:border-brand-300 hover:shadow-lg transition-all sm:text-right">
                <span className="text-[11px] text-text-muted uppercase tracking-wider font-medium">Next →</span>
                <p className="font-semibold text-sm text-text-primary group-hover:text-brand-700 transition-colors mt-1 leading-snug">{next.title}</p>
              </Link>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
