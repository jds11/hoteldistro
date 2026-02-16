#!/usr/bin/env python3
"""Convert markdown tables to styled HTML in MDX files."""
import os, re, glob

CHAPTERS_DIR = "src/content/chapters"
total_converted = 0

def convert_md_table(lines, is_key_terms=False):
    """Convert markdown table lines to styled HTML."""
    # Parse header
    headers = [c.strip().strip('*') for c in lines[0].strip('| \n').split('|')]
    # Skip separator row (line 1)
    rows = []
    for line in lines[2:]:
        cells = [c.strip() for c in line.strip('| \n').split('|')]
        rows.append(cells)
    
    if is_key_terms:
        # Key Terms: definition list style table
        html = '<div className="my-8 overflow-x-auto">\n'
        html += '<table className="w-full border-collapse text-sm">\n'
        html += '<thead>\n<tr className="border-b-2 border-brand-200">\n'
        for h in headers:
            html += f'<th className="py-3 px-4 text-left font-semibold text-brand-900">{h}</th>\n'
        html += '</tr>\n</thead>\n<tbody>\n'
        for row in rows:
            html += '<tr className="border-b border-gray-200 hover:bg-gray-50">\n'
            for i, cell in enumerate(row):
                weight = 'font-semibold text-brand-800' if i == 0 else 'text-primary'
                html += f'<td className="py-3 px-4 {weight}">{cell}</td>\n'
            html += '</tr>\n'
        html += '</tbody>\n</table>\n</div>'
    else:
        # Regular table
        html = '<div className="my-6 overflow-x-auto">\n'
        html += '<table className="w-full border-collapse text-sm">\n'
        html += '<thead>\n<tr className="bg-brand-50 border-b-2 border-brand-200">\n'
        for h in headers:
            html += f'<th className="py-3 px-4 text-left font-semibold text-brand-900">{h}</th>\n'
        html += '</tr>\n</thead>\n<tbody>\n'
        for row in rows:
            html += '<tr className="border-b border-gray-200 hover:bg-gray-50">\n'
            for cell in row:
                html += f'<td className="py-3 px-4 text-primary">{cell}</td>\n'
            html += '</tr>\n'
        html += '</tbody>\n</table>\n</div>'
    
    return html

for filepath in sorted(glob.glob(os.path.join(CHAPTERS_DIR, "*.mdx"))):
    fname = os.path.basename(filepath)
    with open(filepath, 'r') as f:
        content = f.read()
    
    lines = content.split('\n')
    new_lines = []
    i = 0
    file_tables = 0
    in_key_terms = False
    
    while i < len(lines):
        # Track if we're in Key Terms section
        if lines[i].startswith('## Key Terms'):
            in_key_terms = True
        elif lines[i].startswith('## ') and not lines[i].startswith('## Key Terms'):
            in_key_terms = False
        
        # Detect start of markdown table (line starts with | and next line is separator)
        if lines[i].strip().startswith('|') and i + 1 < len(lines) and re.match(r'^\|[\s\-:|]+\|$', lines[i+1].strip()):
            # Collect all table lines
            table_lines = []
            j = i
            while j < len(lines) and lines[j].strip().startswith('|'):
                table_lines.append(lines[j])
                j += 1
            
            html = convert_md_table(table_lines, is_key_terms=in_key_terms)
            new_lines.append(html)
            file_tables += 1
            i = j
        else:
            new_lines.append(lines[i])
            i += 1
    
    if file_tables > 0:
        with open(filepath, 'w') as f:
            f.write('\n'.join(new_lines))
        print(f"  ✓ {fname}: {file_tables} tables converted")
        total_converted += file_tables
    else:
        print(f"  - {fname}: no tables")

print(f"\n  Total: {total_converted} tables converted across all chapters.")
