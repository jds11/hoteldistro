import { ReactNode } from "react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const seenIds = new Map<string, number>();

function uniqueId(base: string): string {
  const count = seenIds.get(base) || 0;
  seenIds.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}

/** Match numbered sections like "7.1 The Architecture of Loyalty" */
const NUMBERED_RE = /^(\d+\.\d+)\s+(.+)$/;

function Heading({
  level,
  children,
}: {
  level: 2 | 3;
  children: ReactNode;
}) {
  const text = typeof children === "string" ? children : "";
  const id = uniqueId(slugify(text));
  const Tag = `h${level}` as "h2" | "h3";

  // For numbered h2s, render stacked: small section number on top, title below
  if (level === 2) {
    const match = text.match(NUMBERED_RE);
    if (match) {
      const [, num, title] = match;
      return (
        <div id={id} className="mt-12 mb-4 pt-8 border-t border-border-light">
          <a href={`#${id}`} className="no-underline hover:no-underline block">
            <span className="block text-xs font-semibold uppercase tracking-widest text-brand-500 mb-1">
              {num}
            </span>
            <span className="block text-xl font-bold tracking-tight text-text-primary">
              {title}
            </span>
          </a>
        </div>
      );
    }
  }

  return (
    <Tag id={id}>
      <a href={`#${id}`} className="no-underline hover:no-underline">
        {children}
      </a>
    </Tag>
  );
}

export const mdxComponents = {
  h2: ({ children }: { children: ReactNode }) => (
    <Heading level={2}>{children}</Heading>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <Heading level={3}>{children}</Heading>
  ),
};
