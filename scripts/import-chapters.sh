#!/bin/bash
# Quick chapter import from Dot Matrix's textbook directory.
# Run this whenever chapters are updated:
#   bash scripts/import-chapters.sh
#
# What it does:
# 1. Copies latest markdown from dotmatrix/textbook/chapters/
# 2. Converts to MDX with frontmatter
# 3. Copies latest exhibit PNGs
#
# NOTE: This overwrites src/content/chapters/*.mdx — any manual edits
# to those files will be lost. All customization (Key Terms tables,
# exhibit injections, etc.) will need to be re-applied via Gilfoyle.

SRC_DIR="/Users/jason/Documents/Technology/Personal AI Bots/dotmatrix/textbook/chapters"
DEST_DIR="/Users/jason/Documents/Technology/Personal AI Bots/gilfoyle/hoteldistro/src/content/chapters"
EXHIBIT_SRC="/Users/jason/Documents/Technology/Personal AI Bots/dotmatrix/textbook"
EXHIBIT_DEST="/Users/jason/Documents/Technology/Personal AI Bots/gilfoyle/hoteldistro/public/exhibits"

echo "📚 Importing chapters from Dot Matrix..."
echo "   Source: $SRC_DIR"
echo ""

python3 << 'PY'
import os, re

SRC = "/Users/jason/Documents/Technology/Personal AI Bots/dotmatrix/textbook/chapters"
DEST = "/Users/jason/Documents/Technology/Personal AI Bots/gilfoyle/hoteldistro/src/content/chapters"

chapters = [
    (1, "distribution-101", "Distribution 101", "chapter-01-distribution-101.md"),
    (2, "hotel-technology", "Hotel Technology", "chapter-02-hotel-technology.md"),
    (3, "value-of-a-guest", "The Value of a Guest", "chapter-03-value-of-a-guest.md"),
    (4, "digital-direct", "Digital Direct", "chapter-04-digital-direct.md"),
    (5, "group-bookings", "Group Bookings", "chapter-05-group-bookings.md"),
    (6, "voice-and-walk-in", "Voice & Walk-In", "chapter-06-voice-and-walk-in.md"),
    (7, "loyalty-and-personalization", "Loyalty & Personalization", "chapter-07-loyalty-and-personalization.md"),
    (8, "gds-travel-agents-managed-travel", "GDS, Travel Agents & Managed Travel", "chapter-08-gds-travel-agents-managed-travel.md"),
    (9, "otas-deep-dive", "OTAs Deep Dive", "chapter-09-otas-deep-dive.md"),
    (10, "wholesale-deep-dive", "Wholesale Deep Dive", "chapter-10-wholesale-deep-dive.md"),
    (11, "metasearch-deep-dive", "Metasearch Deep Dive", "chapter-11-metasearch-deep-dive.md"),
    (12, "sharing-economy", "The Sharing Economy", "chapter-12-sharing-economy.md"),
    (13, "social-media-super-apps-ai", "Social Media, Super Apps & AI", "chapter-13-social-media-super-apps-ai.md"),
    (14, "future-tech-stack", "The Future Tech Stack", "chapter-14-future-tech-stack.md"),
]

os.makedirs(DEST, exist_ok=True)

for num, slug, title, filename in chapters:
    src_path = os.path.join(SRC, filename)
    if not os.path.exists(src_path):
        print(f"  ⚠ SKIP {filename} — not found")
        continue

    with open(src_path, "r") as f:
        lines = f.readlines()

    start = 1
    while start < len(lines) and lines[start].strip() in ("", "---"):
        start += 1

    content = "".join(lines[start:])
    # Strip NYU header block if present
    import re as _re
    content = _re.sub(r'^\s*\*\*Hospitality Distribution.*?(?=\n## )', '', content, flags=_re.DOTALL)
    frontmatter = f'---\nnumber: {num}\ntitle: "{title}"\n---\n\n'

    dest_path = os.path.join(DEST, f"{slug}.mdx")
    with open(dest_path, "w") as f:
        f.write(frontmatter + content)

    print(f"  ✓ {slug}.mdx ({len(lines)-start} lines)")

print(f"\n  Done. {len(chapters)} chapters imported.")
print("  ⚠ Remember: Key Terms tables and exhibit images need re-processing.")
print("  Ask Gilfoyle to run the table formatter and exhibit injector.")
PY

echo ""
echo "📷 Copying exhibits..."
cp "$EXHIBIT_SRC"/exhibit-*.png "$EXHIBIT_DEST/" 2>/dev/null
echo "   ✓ $(ls "$EXHIBIT_DEST"/*.png 2>/dev/null | wc -l | tr -d ' ') exhibit PNGs"
echo ""
echo "✅ Import complete. Run 'npm run build' to verify."
