import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import articles from "@/lib/news-articles.json";

export const metadata = {
  title: "News & Research — Hotel Distribution",
  description: "Curated articles, research, and industry news on hotel distribution strategy and technology.",
};

interface Article {
  title: string;
  author: string;
  source: string;
  date: string;
  description: string;
  url: string;
  image?: string;
  tags?: string[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function NewsPage() {
  const sorted = [...(articles as Article[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Group by month/year
  const grouped = new Map<string, Article[]>();
  for (const article of sorted) {
    const d = new Date(article.date + "T00:00:00");
    const key = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(article);
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Nav />
      <PageHeader
        label="News & Research"
        title="Distribution Intelligence"
        subtitle="Curated articles and research from across the hotel distribution landscape."
      />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-10 w-full">
        {sorted.length <= 1 && sorted[0]?.url === "https://example.com/article" ? (
          <div className="text-center py-16">
            <svg className="w-12 h-12 text-brand-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Articles incoming</h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              We&apos;re curating the best hotel distribution articles, research, and industry analysis. Check back soon.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {[...grouped.entries()].map(([monthYear, monthArticles]) => (
              <section key={monthYear}>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-5 pb-2 border-b border-border">
                  {monthYear}
                </h2>
                <div className="space-y-4">
                  {monthArticles.map((article, i) => (
                    <a
                      key={i}
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-white border border-border rounded-xl overflow-hidden hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100/30 transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Image */}
                        {article.image ? (
                          <div className="sm:w-48 sm:shrink-0 aspect-[2/1] sm:aspect-auto bg-brand-50 overflow-hidden">
                            <img
                              src={article.image}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          <div className="hidden sm:flex sm:w-48 sm:shrink-0 bg-gradient-to-br from-brand-50 to-brand-100 items-center justify-center">
                            <svg className="w-8 h-8 text-brand-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-center min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
                              {article.source}
                            </span>
                            <span className="text-[11px] text-text-muted">·</span>
                            <span className="text-[11px] text-text-muted">{formatDate(article.date)}</span>
                            {article.tags?.map((tag) => (
                              <span key={tag} className="text-[11px] text-brand-500 bg-brand-50 px-2 py-0.5 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-bold text-text-primary text-base leading-snug group-hover:text-brand-700 transition-colors mb-1.5">
                            {article.title}
                          </h3>
                          <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-2">
                            {article.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-text-muted">{article.author}</span>
                            <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
