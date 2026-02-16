import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-text-secondary text-xs">
              © {new Date().getFullYear()} David Pavelko, Jason Shames & Richie Karaburun
            </span>
          </div>
          <nav className="flex items-center gap-4 text-xs">
            <Link href="/about" className="hover:text-brand-600 transition-colors">About</Link>
            <Link href="/glossary" className="hover:text-brand-600 transition-colors">Glossary</Link>
            <Link href="/contact" className="hover:text-brand-600 transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
