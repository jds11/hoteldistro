import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CHAPTERS_DIR = path.join(process.cwd(), "src/content/chapters");

const DESCRIPTIONS: Record<string, string> = {
  "distribution-101": "The foundational map — what distribution means, how it evolved from roadside signs to algorithmic pricing, and who the key players are today.",
  "hotel-technology": "PMS, CRS, channel managers, RMS, and the integration challenge — the complete technology stack powering modern hotel distribution.",
  "value-of-a-guest": "Customer lifetime value, Net RevPAR, the true cost of acquisition, and why not all bookings are created equal.",
  "digital-direct": "Brand.com strategy, SEO/SEM, booking engines, rate guarantees, and the economics of direct vs. indirect bookings.",
  "group-bookings": "Group segments, displacement analysis, contract negotiations, and how digital platforms are transforming meetings & events.",
  "voice-and-walk-in": "Call centers as distribution channels, IVR technology, messaging platforms, and the front desk as a sales channel.",
  "loyalty-and-personalization": "Program structures, the financial architecture of points, personalization engines, and the future of guest loyalty.",
  "otas-deep-dive": "Agency vs. merchant models, the Booking/Expedia duopoly, ranking algorithms, rate parity, and managing OTA relationships.",
  "wholesale-deep-dive": "Bed banks, net rates, rate leakage, B2B distribution chains, and the explosive growth of wholesale post-COVID.",
  "metasearch-deep-dive": "Google Hotels, Trivago, CPC vs. CPA bidding, rate feed accuracy, and metasearch as a direct booking weapon.",
  "sharing-economy": "Airbnb's impact on hotels, alternative accommodations, regulatory battles, and how the industry is fighting back.",
  "social-media-super-apps-ai": "Social commerce, super apps, generative AI in travel search, conversational interfaces, and ethical considerations.",
  "future-tech-stack": "Composable architecture, unified commerce, agentic AI, IoT, cybersecurity, and distribution careers in 2030.",
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

  // Take first 2 paragraphs or ~500 chars
  let excerpt = "";
  for (const p of paragraphs) {
    if (excerpt.length + p.length > 600 && excerpt.length > 0) break;
    excerpt += (excerpt ? "\n\n" : "") + p;
  }

  // Remove the vignette section from content
  const contentWithout = content.slice(0, startIdx) + content.slice(endIdx);

  return { vignette: excerpt, contentWithout };
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
