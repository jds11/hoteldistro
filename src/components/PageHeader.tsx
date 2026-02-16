import Link from "next/link";

interface Props {
  breadcrumb?: { label: string; href: string };
  label?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ breadcrumb, label, title, subtitle }: Props) {
  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-10 w-full">
        {breadcrumb && (
          <Link
            href={breadcrumb.href}
            className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-brand-600 transition-colors mb-4"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {breadcrumb.label}
          </Link>
        )}
        {label && (
          <p className="text-brand-600 text-xs font-semibold uppercase tracking-wider mb-2">
            {label}
          </p>
        )}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-text-secondary text-[15px] leading-relaxed max-w-xl">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
