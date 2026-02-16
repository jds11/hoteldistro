import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
export const metadata = { 
  title: "About — Hotel Distribution",
  description: "Meet the authors and contributors behind this comprehensive hotel distribution textbook, created by industry practitioners at the NYU Tisch Center for Hospitality."
};

const authors = [
  {
    name: "Jason Shames",
    role: "VP of Product, Fora Travel",
    initials: "JS",
    linkedin: "https://www.linkedin.com/in/jshames/",
    bio: "Jason has spent his career at the intersection of hospitality and technology, building products at Fora Travel, Safara, Skipper, and Ace Hotel. He brings deep product expertise and a practitioner's perspective to hotel distribution strategy. Jason is an adjunct instructor at the NYU Jonathan M. Tisch Center for Hospitality, where he co-created the Distribution & Demand Management curriculum.",
  },
  {
    name: "David Pavelko",
    role: "Global Hospitality Partnerships Director, Google Travel",
    initials: "DP",
    linkedin: "https://www.linkedin.com/in/davidpavelko/",
    bio: "David works directly with Google's consumer travel initiatives, supporting overall strategy, business development, and partnership efforts. He previously served as Head of Travel at Google, managing campaigns across search, display, mobile, and YouTube for airlines, hotel chains, OTAs, and metasearch platforms. Before Google, David spent six years at Cendant Corporation as VP of Business Development. He holds a degree from Princeton University and a Master's in Travel & Tourism from George Washington University. David teaches at the NYU Tisch Center and Boston University's School of Hospitality Administration.",
  },
];

const contributors = [
  { name: "Richie Karaburun", role: "Clinical Assistant Professor, NYU Tisch Center for Hospitality" },
  { name: "Samantha Shankman", role: "Curriculum Contributor" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Nav />
      <PageHeader
        label="The Team"
        title="About This Textbook"
        subtitle="Written for the leaders of tomorrow by hospitality distribution practitioners who love and believe in this industry."
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-12">
        {/* Origin Story */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
            The Story
          </h2>
          <div className="bg-white border border-border rounded-lg p-6 sm:p-8 text-[15px] text-text-secondary leading-relaxed space-y-4">
            <p>
              Jason Shames and David Pavelko teach the Distribution & Demand Management
              class at the{" "}
              <a href="https://www.sps.nyu.edu/about/academic-divisions-and-departments/jonathan-m-tisch-center-of-hospitality.html" target="_blank" rel="noopener noreferrer" className="text-brand-600 font-medium hover:underline">
                NYU Jonathan M. Tisch Center for Hospitality
              </a>
              . When they started in 2020, there was no textbook — so they built one.
            </p>
            <p>
              Along with Richie Karaburun and Samantha Shankman, they created the curriculum
              from scratch, drawing on decades of collective experience building technology
              platforms, advising hotel brands, and innovating on the front lines of this
              business. This material has been refined over several years of graduate and
              undergraduate instruction.
            </p>
            <p>
              The course was inspired by Dr. William Carroll&apos;s{" "}
              <em>Managing Hospitality Distribution Strategies</em> at the Cornell
              School of Hotel Administration — a pioneering program that first gave this
              subject the academic rigor it deserves.
            </p>
          </div>
        </section>

        {/* Authors */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
            Authors
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {authors.map((a) => (
              <div key={a.name} className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-[72px] h-[72px] rounded-full bg-brand-100 border-2 border-brand-200 flex items-center justify-center">
                      <span className="text-brand-700 font-bold text-lg">{a.initials}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-text-primary">{a.name}</h3>
                        <a
                          href={a.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                          aria-label={`${a.name} on LinkedIn`}
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      </div>
                      <p className="text-xs text-text-secondary mt-0.5">{a.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">{a.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contributors */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
            Contributors
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {contributors.map((c) => (
              <div key={c.name} className="bg-white border border-border rounded-lg p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
                  <span className="text-text-muted font-semibold text-xs">
                    {c.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary text-sm">{c.name}</h3>
                  <p className="text-xs text-text-secondary">{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Book Structure */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
            How This Book Is Structured
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { part: "Part I: Introduction", desc: "Defining distribution, the technology that powers it, and the lifetime value of a guest." },
              { part: "Part II: Direct Channels", desc: "Digital direct, group sales, voice reservations, and loyalty programs." },
              { part: "Part III: Indirect Channels", desc: "OTAs, wholesalers, GDS platforms, and metasearch engines." },
              { part: "Part IV: Future of Distribution", desc: "The sharing economy, social commerce, generative AI, and the evolving tech stack." },
            ].map((p) => (
              <div key={p.part} className="bg-white border border-border rounded-lg p-4">
                <h3 className="font-semibold text-text-primary text-sm">{p.part}</h3>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center pt-2">
          <Link
            href="/chapters/distribution-101"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-900 text-white font-semibold text-sm rounded-full hover:bg-brand-800 transition-colors"
          >
            Start Reading Chapter 1
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
