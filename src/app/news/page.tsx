import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: "News & Research — Hotel Distribution" };

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Nav />
      <PageHeader
        label="Industry Resources"
        title="News & Research"
        subtitle="Articles, reports, and research from leading industry sources. Coming soon."
      />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="bg-white border border-border rounded-lg p-10 text-center">
          <h2 className="font-semibold text-text-primary mb-1">Coming Soon</h2>
          <p className="text-sm text-text-muted max-w-sm mx-auto">
            A curated feed of industry articles, research, and reports referenced throughout the textbook.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
