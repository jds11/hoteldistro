import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-brand-800 flex items-center justify-center">
              <span className="text-white font-bold text-[8px] tracking-tight">HD</span>
            </div>
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
