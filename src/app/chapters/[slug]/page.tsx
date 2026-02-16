import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getChapterBySlug,
  getAllChapters,
  getChapterSections,
  extractVignette,
  extractIntroTitle,
  extractLearningObjectives,
  extractChapterSummary,
  extractKeyTerms,
  extractDiscussionQuestions,
  extractReferences,
} from "@/lib/chapters";
import { getPartColors } from "@/lib/part-colors";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChapterSubNav from "@/components/ChapterSubNav";
import TableOfContents from "@/components/TableOfContents";
import { mdxComponents } from "@/components/MdxComponents";
import CollapsibleReferences from "@/components/CollapsibleReferences";
import CollapsibleKeyTerms from "@/components/CollapsibleKeyTerms";

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

  // Extract special sections in order: intro title → learning objectives → vignette
  const introTitleResult = extractIntroTitle(chapter.content);
  const afterTitle = introTitleResult ? introTitleResult.contentWithout : chapter.content;
  const loResult = extractLearningObjectives(afterTitle);
  const afterLO = loResult ? loResult.contentWithout : afterTitle;
  const vignetteResult = extractVignette(afterLO);
  const afterVignette = vignetteResult ? vignetteResult.contentWithout : afterLO;
  const summaryResult = extractChapterSummary(afterVignette);
  const afterSummary = summaryResult ? summaryResult.contentWithout : afterVignette;
  const keyTermsResult = extractKeyTerms(afterSummary);
  const afterKT = keyTermsResult ? keyTermsResult.contentWithout : afterSummary;
  const dqResult = extractDiscussionQuestions(afterKT);
  const afterDQ = dqResult ? dqResult.contentWithout : afterKT;
  const refsResult = extractReferences(afterDQ);
  const displayContent = refsResult ? refsResult.contentWithout : afterDQ;

  // Build sections for TOC, then append end-of-chapter sections
  const contentSections = getChapterSections(displayContent);
  const endSections: { id: string; title: string; level: number }[] = [];
  if (summaryResult) endSections.push({ id: "chapter-summary", title: "Chapter Summary", level: 2 });
  if (dqResult) endSections.push({ id: "discussion-questions", title: "Discussion Questions", level: 2 });
  if (keyTermsResult) endSections.push({ id: "key-terms", title: "Key Terms", level: 2 });
  if (refsResult) endSections.push({ id: "references", title: "References", level: 2 });
  const sections = [...contentSections, ...endSections];

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
      <article className="flex-1" role="main">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <TableOfContents sections={sections} />

          {/* Learning Objectives */}
          {loResult && (
            <div className="mb-8 bg-slate-50 border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-text-primary text-sm font-bold uppercase tracking-wider">
                  Learning Objectives
                </span>
              </div>
              <div className="text-[14px] text-text-secondary leading-[1.8] space-y-1.5">
                {loResult.objectives.split("\n").filter((l) => l.trim()).map((line, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>') }} />
                ))}
              </div>
            </div>
          )}

          {/* Intro title — standalone chapter title like "The Technology Stack That Powers Distribution" */}
          {introTitleResult && (
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mt-8 mb-6">
              {introTitleResult.introTitle}
            </h2>
          )}

          {/* Vignette callout */}
          {vignetteResult && (
            <div className="mb-10 bg-brand-900 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <span className="text-brand-300 text-sm font-bold uppercase tracking-wider">
                  Opening Vignette
                </span>
              </div>
              <div className="text-[15px] text-white/90 leading-[1.8] space-y-4">
                {vignetteResult.vignette.split("\n\n").map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>') }} />
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

          {/* Chapter Summary */}
          {summaryResult && (
            <div id="chapter-summary" className="mt-14 bg-brand-900 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span className="text-brand-300 text-sm font-bold uppercase tracking-wider">
                  Chapter Summary
                </span>
              </div>
              <div className="text-[15px] text-white/90 leading-[1.8] space-y-3">
                {summaryResult.summary.split("\n").filter((l: string) => l.trim()).map((line: string, i: number) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>') }} />
                ))}
              </div>
            </div>
          )}

          {/* Discussion Questions */}
          {dqResult && (
            <div id="discussion-questions" className="mt-10 bg-slate-50 border border-border rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                <span className="text-text-primary text-sm font-bold uppercase tracking-wider">
                  Discussion Questions
                </span>
              </div>
              <div className="text-[14px] text-text-secondary leading-[1.8] space-y-3">
                {dqResult.questions.split("\n").filter((l: string) => l.trim()).map((line: string, i: number) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>') }} />
                ))}
              </div>
            </div>
          )}

          {/* Key Terms — collapsible, open by default */}
          {keyTermsResult && (
            <div id="key-terms" className="mt-10">
              <CollapsibleKeyTerms html={keyTermsResult.keyTerms} />
            </div>
          )}

          {/* References — collapsible, closed by default */}
          {refsResult && (
            <div id="references" className="mt-6">
              <CollapsibleReferences references={refsResult.references} />
            </div>
          )}
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
