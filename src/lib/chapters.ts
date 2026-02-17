import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CHAPTERS_DIR = path.join(process.cwd(), "src/content/chapters");

const DESCRIPTIONS: Record<string, string> = {
  "distribution-101": "The channels that connect hotels to guests — from GDS and OTAs to brand.com — and the economics behind every booking path.",
  "hotel-technology": "PMS, CRS, channel managers, RMS, booking engines, and the integration challenges of running a modern hotel tech stack.",
  "value-of-a-guest": "Customer lifetime value, Net RevPAR, acquisition costs, guest segmentation, and why not all bookings are created equal.",
  "digital-direct": "The direct booking wars, brand.com optimization, SEO/SEM strategy, rate guarantees, and the fight to reduce OTA dependence.",
  "group-bookings": "Corporate meetings, conventions, SMERF — displacement analysis, contract negotiations, and digital platforms reshaping group sales.",
  "voice-and-walk-in": "Call centers, IVR systems, messaging channels, and walk-in strategy — where high-touch service meets complex, high-value reservations.",
  "loyalty-and-personalization": "Points programs as multibillion-dollar ecosystems — Marriott Bonvoy, Hilton Honors, Hyatt — and the shift toward AI-driven personalization.",
  "otas-deep-dive": "Inside the Booking/Expedia duopoly — commission models, ranking algorithms, rate parity battles, and the billboard effect debate.",
  "wholesale-deep-dive": "Bed banks, net rates, B2B supply chains, and the rate leakage problem that costs hotels millions in lost revenue.",
  "metasearch-deep-dive": "Google Hotel Ads, Trivago, CPC vs. CPA bidding, and how metasearch became the direct booking channel hotels didn't expect.",
  "sharing-economy": "Airbnb's rise to 7.7 million listings, its impact on hotel competitive sets, and how the industry is fighting back.",
  "social-media-super-apps-ai": "TikTok-driven bookings, WeChat super apps, generative AI trip planners, and the collapse of the traditional search funnel.",
  "future-tech-stack": "Composable architecture, agentic AI, cybersecurity after the Marriott breach, and the careers emerging in distribution technology.",
};

export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  description: string;
}

export interface ChapterSection {
  id: string;
  title: string;
  level: number;
}

export function getAllChapters(): ChapterMeta[] {
  if (!fs.existsSync(CHAPTERS_DIR)) return [];

  const files = fs.readdirSync(CHAPTERS_DIR).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(CHAPTERS_DIR, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        number: data.number ?? 0,
        title: data.title ?? slug,
        description: DESCRIPTIONS[slug] || "",
      };
    })
    .sort((a, b) => a.number - b.number);
}

/**
 * Extract a standalone intro title — a non-numbered, non-structural h2
 * that appears before the first numbered section or Opening Vignette.
 * e.g. "The Technology Stack That Powers Distribution" in Ch2.
 * Returns the title text and content with the heading removed.
 */
/**
 * Extract Learning Objectives section from chapter content.
 * Returns the objectives text and content with the section removed.
 */
export function extractLearningObjectives(content: string): { objectives: string; contentWithout: string } | null {
  const match = content.match(/^(#{2,3})\s+Learning Objectives[^\n]*\n/m);
  if (!match) return null;

  const startIdx = match.index!;
  const afterHeading = startIdx + match[0].length;

  // Find next ## heading
  const nextHeading = content.indexOf("\n## ", afterHeading);
  const endIdx = nextHeading === -1 ? content.length : nextHeading;

  const objectivesText = content.slice(afterHeading, endIdx).trim();
  // Filter out --- separators and blank intro lines
  const lines = objectivesText.split("\n").filter((l) => l.trim() !== "---");
  const cleaned = lines.join("\n").trim();

  const contentWithout = content.slice(0, startIdx) + content.slice(endIdx);

  return { objectives: cleaned, contentWithout };
}

export function extractIntroTitle(content: string): { introTitle: string; contentWithout: string } | null {
  const skip = /^##\s+(Opening Vignette|Learning Objectives|Key Terms|References|Discussion Questions|\d)/;
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^##\s+(.+)/);
    if (!match) continue;
    // If first h2 is structural/numbered, no intro title
    if (skip.test(lines[i])) return null;
    // Found an intro title — also remove trailing separator (---) if present
    const title = match[1].trim();
    let removeEnd = i + 1;
    // Skip blank lines and a single --- after the heading
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === "") j++;
    if (j < lines.length && lines[j].trim() === "---") {
      removeEnd = j + 1;
    }
    const contentWithout = [...lines.slice(0, i), ...lines.slice(removeEnd)].join("\n");
    return { introTitle: title, contentWithout };
  }
  return null;
}

export function extractVignette(content: string): { vignette: string; contentWithout: string } | null {
  // Match "## Opening Vignette", "### Opening Vignette", or "## X.X Opening Vignette: ..."
  const vignetteMatch = content.match(/^(#{2,3})\s+(?:\d+\.\d+\s+)?Opening Vignette[^\n]*\n/m);
  if (!vignetteMatch) return null;

  const startIdx = vignetteMatch.index!;
  const afterHeading = startIdx + vignetteMatch[0].length;

  // Find the next ## heading (always stop at h2, regardless of whether vignette was h2 or h3)
  const nextHeading = content.indexOf("\n## ", afterHeading);
  const endIdx = nextHeading === -1 ? content.length : nextHeading;

  // Get vignette paragraphs (first 2-3 paragraphs, max ~600 chars)
  const vignetteText = content.slice(afterHeading, endIdx).trim();
  const paragraphs = vignetteText.split("\n\n").filter((p) => p.trim() && !p.startsWith("---"));

    const excerpt = paragraphs.join("\n\n");

  // Remove the vignette section from content
  const contentWithout = content.slice(0, startIdx) + content.slice(endIdx);

  return { vignette: excerpt, contentWithout };
}

/**
 * Extract Key Terms section from chapter content.
 * Returns the raw HTML/content and content with the section removed.
 */
export function extractKeyTerms(content: string): { keyTerms: string; contentWithout: string } | null {
  const match = content.match(/^##\s+Key Terms[^\n]*\n/m);
  if (!match) return null;

  const startIdx = match.index!;
  const afterHeading = startIdx + match[0].length;

  const nextHeading = content.indexOf("\n## ", afterHeading);
  const endIdx = nextHeading === -1 ? content.length : nextHeading;

  const text = content.slice(afterHeading, endIdx).trim();
  const contentWithout = content.slice(0, startIdx) + content.slice(endIdx);

  return { keyTerms: text, contentWithout };
}

/**
 * Extract Discussion Questions section from chapter content.
 */
export function extractDiscussionQuestions(content: string): { questions: string; contentWithout: string } | null {
  const match = content.match(/^##\s+Discussion Questions[^\n]*\n/m);
  if (!match) return null;

  const startIdx = match.index!;
  const afterHeading = startIdx + match[0].length;

  const nextHeading = content.indexOf("\n## ", afterHeading);
  const endIdx = nextHeading === -1 ? content.length : nextHeading;

  const text = content.slice(afterHeading, endIdx).trim();
  const contentWithout = content.slice(0, startIdx) + content.slice(endIdx);

  return { questions: text, contentWithout };
}

/**
 * Extract References section from chapter content.
 */
export function extractReferences(content: string): { references: string; contentWithout: string } | null {
  const match = content.match(/^##\s+References[^\n]*\n/m);
  if (!match) return null;

  const startIdx = match.index!;
  const afterHeading = startIdx + match[0].length;

  const nextHeading = content.indexOf("\n## ", afterHeading);
  const endIdx = nextHeading === -1 ? content.length : nextHeading;

  const text = content.slice(afterHeading, endIdx).trim();
  const contentWithout = content.slice(0, startIdx) + content.slice(endIdx);

  return { references: text, contentWithout };
}

/**
 * Extract Chapter Summary section from chapter content.
 * Returns the summary text and content with the section removed.
 */
export function extractChapterSummary(content: string): { summary: string; contentWithout: string } | null {
  const match = content.match(/^##\s+Chapter Summary[^\n]*\n/m);
  if (!match) return null;

  const startIdx = match.index!;
  const afterHeading = startIdx + match[0].length;

  const nextHeading = content.indexOf("\n## ", afterHeading);
  const endIdx = nextHeading === -1 ? content.length : nextHeading;

  const summaryText = content.slice(afterHeading, endIdx).trim();
  const contentWithout = content.slice(0, startIdx) + content.slice(endIdx);

  return { summary: summaryText, contentWithout };
}

export function getChapterSections(content: string): ChapterSection[] {
  const lines = content.split("\n");
  const sections: ChapterSection[] = [];
  const seen = new Map<string, number>();

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (!match) continue;

    const level = match[1].length;
    const title = match[2].trim();

    // Skip non-content headings
    if (["Key Terms", "References", "Discussion Questions"].includes(title)) continue;
    if (title.startsWith("<")) continue; // Skip HTML

    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count}`;

    sections.push({ id, title, level });
  }

  return sections;
}

export function getChapterBySlug(slug: string) {
  const filePath = path.join(CHAPTERS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      number: data.number ?? 0,
      title: data.title ?? slug,
      description: data.description,
    },
    content,
  };
}
