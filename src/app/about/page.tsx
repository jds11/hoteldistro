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
    name: "David Pavelko",
    role: "Global Hospitality Partnerships Director, Google Travel",
    initials: "DP",
    photo: "/authors/david-pavelko.jpg",
    linkedin: "https://www.linkedin.com/in/davidpavelko/",
    bio: "David works directly with Google's consumer travel initiatives, supporting overall strategy, business development, and partnership efforts. He previously served as Head of Travel at Google, managing campaigns across search, display, mobile, and YouTube for airlines, hotel chains, OTAs, and metasearch platforms. Before Google, David spent six years at Cendant Corporation as VP of Business Development. He holds a degree from Princeton University and a Master's in Travel & Tourism from George Washington University. David teaches at the NYU Tisch Center and Boston University's School of Hospitality Administration.",
  },
  {
    name: "Jason Shames",
    role: "VP of Product, Fora Travel",
    initials: "JS",
    photo: "/authors/jason-shames.jpg",
    linkedin: "https://www.linkedin.com/in/jshames/",
    bio: "Jason has spent his career at the intersection of hospitality and technology, building products at Fora Travel, Safara, Skipper, and Ace Hotel. He brings deep product expertise and a practitioner's perspective to hotel distribution strategy. Jason is an adjunct instructor at the NYU Jonathan M. Tisch Center for Hospitality, where he co-created the Distribution & Demand Management curriculum.",
  },
  {
    name: "Richie Karaburun",
    role: "Clinical Associate Professor, NYU Tisch Center of Hospitality",
    initials: "RK",
    photo: "/authors/richie-karaburun.jpg",
    linkedin: "https://www.linkedin.com/in/dr-richie-karaburun-30465510/",
    bio: 'Dr. Recep "Richie" Karaburun is a Clinical Associate Professor at the NYU Jonathan M. Tisch Center for Hospitality, where he has taught since 2013 and directs the Hospitality Innovation Hub Incubator. He brings over two decades of global leadership in travel and hospitality, with executive roles at Roomer, RADIUS, GTA North America, and American Tours International spanning supplier relations, business development, and product strategy. Richie is a recipient of the 2025 NYU Distinguished Teaching Award and was named a Top 30 Most Influential Educator in Global Hospitality by the International Hospitality Institute. He holds a Doctorate in Business Administration from Pace University.',
  },
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
              Along with Richie Karaburun, they created the curriculum
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
          <div className="space-y-5">
            {authors.map((a) => (
              <div key={a.name} className="bg-white border border-border rounded-lg overflow-hidden">
                <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                  <div className="shrink-0 flex items-center sm:items-start">
                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-brand-200">
                      <img src={a.photo} alt={a.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg text-text-primary">{a.name}</h3>
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
                    <p className="text-sm text-brand-600 font-medium mt-0.5">{a.role}</p>
                    <p className="text-sm text-text-secondary leading-relaxed mt-3">{a.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gratitude */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
            Gratitude
          </h2>
          <div className="bg-white border border-border rounded-lg p-6 sm:p-8 text-[15px] text-text-secondary leading-relaxed space-y-4">
            <p>
              This textbook exists because of the industry leaders who have generously shared their time,
              expertise, and stories with our students at NYU. The guest speakers who have joined our
              Distribution &amp; Demand Management class over the years brought the material to life in
              ways no textbook could on its own — their insights are woven throughout these pages.
            </p>
            <p>
              We are especially grateful to <strong className="text-text-primary">Dr. Nicolas Graf</strong>,
              Dean of the NYU Jonathan M. Tisch Center for Hospitality, whose leadership and support made
              both the course and this textbook possible. We owe a great deal to{" "}
              <strong className="text-text-primary">Samantha Shankman</strong>, whose early contributions
              to the writing helped shape the foundation of this work, and to{" "}
              <strong className="text-text-primary">Dr. Bill Carroll</strong> and{" "}
              <strong className="text-text-primary">Dave Roberts</strong>, whose pioneering work in
              hospitality distribution inspired us to bring this subject into the classroom.
            </p>
            <p>
              We are also grateful to everyone who has influenced us throughout our careers — mentors,
              collaborators, and those who continually push the boundaries of what hospitality can be.
              You&apos;ve made us better practitioners and better educators.
            </p>
            <p>
              And to our families: thank you for the love and support that made it possible to pursue
              sharing our professional passion with the next generation. This work is for you, too.
            </p>
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
