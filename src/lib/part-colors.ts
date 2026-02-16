export interface PartColor {
  card: string;      // card header bg
  hero: string;      // chapter page hero gradient
  badge: string;     // chapter number badge
  badgeText: string; // badge text color
  label: string;     // "Chapter X" label color in hero
  border: string;    // card border on hover
}

// Each Part has a distinct shade — all chapters in a Part share the same color
const PART_DEFS: { range: [number, number]; colors: PartColor }[] = [
  {
    range: [1, 3], // Part I: Introduction — deepest navy
    colors: {
      card: "bg-[#001E3E]",
      hero: "from-[#001E3E] to-[#00284F]",
      badge: "bg-[#d9e2ec]",
      badgeText: "text-[#001E3E]",
      label: "text-[#9fb3c8]",
      border: "hover:border-[#9fb3c8]",
    },
  },
  {
    range: [4, 7], // Part II: Direct Channels — navy
    colors: {
      card: "bg-[#00244B]",
      hero: "from-[#00244B] to-[#002E5A]",
      badge: "bg-[#d9e2ec]",
      badgeText: "text-[#00244B]",
      label: "text-[#9fb3c8]",
      border: "hover:border-[#bcccdc]",
    },
  },
  {
    range: [8, 10], // Part III: Indirect Channels — medium navy-slate
    colors: {
      card: "bg-[#002D5E]",
      hero: "from-[#002D5E] to-[#00376E]",
      badge: "bg-[#d9e2ec]",
      badgeText: "text-[#002D5E]",
      label: "text-[#bcccdc]",
      border: "hover:border-[#bcccdc]",
    },
  },
  {
    range: [11, 13], // Part IV: Future — gray-navy
    colors: {
      card: "bg-[#00336B]",
      hero: "from-[#00336B] to-[#003D7C]",
      badge: "bg-[#e2e8f0]",
      badgeText: "text-[#00336B]",
      label: "text-[#d9e2ec]",
      border: "hover:border-[#d9e2ec]",
    },
  },
];

export function getPartColors(chapterNumber: number): PartColor {
  for (const def of PART_DEFS) {
    if (chapterNumber >= def.range[0] && chapterNumber <= def.range[1]) {
      return def.colors;
    }
  }
  return PART_DEFS[0].colors;
}
