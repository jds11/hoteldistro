import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import GlossaryTable from "@/components/GlossaryTable";
import glossaryData from "@/lib/glossary-data.json";
import glossaryAnchors from "@/lib/glossary-anchors.json";

export const metadata = { 
  title: "Glossary — Hotel Distribution",
  description: "183 key terms and definitions from the hotel distribution industry, sourced from all 14 chapters of this comprehensive textbook."
};

export default function GlossaryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Nav />
      <PageHeader
        label="Reference"
        title="Glossary"
        subtitle={`${glossaryData.length} key terms and definitions from the hotel distribution industry, sourced from all chapters.`}
      />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full">
        <GlossaryTable terms={glossaryData} anchors={glossaryAnchors} />
      </main>
      <Footer />
    </div>
  );
}
