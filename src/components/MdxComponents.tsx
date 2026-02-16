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
