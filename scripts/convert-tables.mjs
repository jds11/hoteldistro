import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const chaptersDir = path.join(__dirname, '..', 'src', 'content', 'chapters');

function convertMarkdownTablesToHtml(content) {
  // Match markdown tables: header row, separator row, then data rows
  const tableRegex = /^(\|.+\|)\n(\|[\s:|-]+\|)\n((?:\|.+\|\n?)+)/gm;
  
  return content.replace(tableRegex, (match, headerLine, separatorLine, bodyLines) => {
    // Parse header cells
    const headers = headerLine.split('|').slice(1, -1).map(c => c.trim());
    
    // Parse body rows
    const rows = bodyLines.trim().split('\n').map(line =>
      line.split('|').slice(1, -1).map(c => c.trim())
    );
    
    // Build HTML
    let html = '<table className="w-full border-collapse my-6 text-sm">\n';
    html += '  <thead>\n    <tr>\n';
    for (const h of headers) {
      html += `      <th className="text-left p-3 bg-surface-alt border-b border-divider font-semibold text-primary">${h}</th>\n`;
    }
    html += '    </tr>\n  </thead>\n';
    html += '  <tbody>\n';
    for (const row of rows) {
      html += '    <tr>\n';
      for (const cell of row) {
        html += `      <td className="p-3 border-b border-divider text-secondary">${cell}</td>\n`;
      }
      html += '    </tr>\n';
    }
    html += '  </tbody>\n</table>';
    return html;
  });
}

const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.mdx'));
let totalConverted = 0;

for (const file of files) {
  const filePath = path.join(chaptersDir, file);
  const original = fs.readFileSync(filePath, 'utf-8');
  const converted = convertMarkdownTablesToHtml(original);
  
  if (converted !== original) {
    fs.writeFileSync(filePath, converted, 'utf-8');
    const tableCount = (converted.match(/<table className=/g) || []).length;
    console.log(`  ✓ ${file} — ${tableCount} table(s)`);
    totalConverted += tableCount;
  }
}

console.log(`\n  Done. ${totalConverted} tables converted.`);
