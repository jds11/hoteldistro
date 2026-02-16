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
      card: "bg-[#0b1d32]",
      hero: "from-[#0b1d32] to-[#142d48]",
      badge: "bg-[#d9e2ec]",
      badgeText: "text-[#0b1d32]",
      label: "text-[#9fb3c8]",
      border: "hover:border-[#9fb3c8]",
    },
  },
  {
    range: [4, 7], // Part II: Direct Channels — rich teal-navy
    colors: {
      card: "bg-[#0c3547]",
      hero: "from-[#0c3547] to-[#14495f]",
      badge: "bg-[#b8e0ec]",
      badgeText: "text-[#0c3547]",
      label: "text-[#7ec8db]",
      border: "hover:border-[#7ec8db]",
    },
  },
  {
    range: [8, 10], // Part III: Indirect Channels — slate blue
    colors: {
      card: "bg-[#1e3a5f]",
      hero: "from-[#1e3a5f] to-[#2a4f7a]",
      badge: "bg-[#c5d5e8]",
      badgeText: "text-[#1e3a5f]",
      label: "text-[#8baac8]",
      border: "hover:border-[#8baac8]",
    },
  },
  {
    range: [11, 13], // Part IV: Future — muted steel
    colors: {
      card: "bg-[#3d5474]",
      hero: "from-[#3d5474] to-[#4e6888]",
      badge: "bg-[#dce4ed]",
      badgeText: "text-[#3d5474]",
      label: "text-[#b8c9db]",
      border: "hover:border-[#b8c9db]",
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
