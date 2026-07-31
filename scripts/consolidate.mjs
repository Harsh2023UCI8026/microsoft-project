// Consolidate all page specs into a single master design document
import fs from 'fs';
import path from 'path';

const SPECS_DIR = '/home/z/my-project/analysis/specs';
const OUT = '/home/z/my-project/analysis/master-spec.json';

const files = fs.readdirSync(SPECS_DIR).filter(f => /^page-\d+\.json$/.test(f)).sort();

const pages = [];
const errors = [];

for (const f of files) {
  const raw = fs.readFileSync(path.join(SPECS_DIR, f), 'utf8');
  const baseName = path.basename(f, '.json'); // 'page-NN'
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    errors.push({ file: f, error: 'outer JSON parse: ' + e.message });
    continue;
  }

  // The CLI sometimes returns the API envelope { choices: [{ message: { content: "..." } }], ... }
  // Sometimes it returns the parsed object directly.
  let contentObj = parsed;
  if (parsed && parsed.choices && parsed.choices[0] && parsed.choices[0].message && typeof parsed.choices[0].message.content === 'string') {
    let contentStr = parsed.choices[0].message.content.trim();
    // Strip markdown code fences if present
    if (contentStr.startsWith('```')) {
      contentStr = contentStr.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '').trim();
    }
    try {
      contentObj = JSON.parse(contentStr);
    } catch (e) {
      // Try to find the first { and last }
      const first = contentStr.indexOf('{');
      const last = contentStr.lastIndexOf('}');
      if (first >= 0 && last > first) {
        try {
          contentObj = JSON.parse(contentStr.slice(first, last + 1));
        } catch (e2) {
          errors.push({ file: f, error: 'inner JSON parse: ' + e2.message, raw: contentStr.slice(0, 200) });
          continue;
        }
      } else {
        errors.push({ file: f, error: 'no JSON found', raw: contentStr.slice(0, 200) });
        continue;
      }
    }
  }

  // Force the correct page_id from filename
  contentObj.page_id = baseName;
  pages.push(contentObj);
}

// Aggregate
const colorCounts = {};
const fontCounts = {};
const navItemCounts = {};

for (const p of pages) {
  if (p.color_palette) {
    for (const [k, v] of Object.entries(p.color_palette)) {
      if (typeof v === 'string' && v.startsWith('#')) {
        const key = `${k}:${v.toLowerCase()}`;
        colorCounts[key] = (colorCounts[key] || 0) + 1;
      }
    }
  }
  if (p.typography) {
    if (p.typography.heading_font) {
      const k = `heading:${p.typography.heading_font.toLowerCase()}`;
      fontCounts[k] = (fontCounts[k] || 0) + 1;
    }
    if (p.typography.body_font) {
      const k = `body:${p.typography.body_font.toLowerCase()}`;
      fontCounts[k] = (fontCounts[k] || 0) + 1;
    }
  }
  if (p.header && p.header.nav_items) {
    for (const item of p.header.nav_items) {
      const k = String(item).toLowerCase().trim();
      navItemCounts[k] = (navItemCounts[k] || 0) + 1;
    }
  }
}

const topColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);
const topFonts = Object.entries(fontCounts).sort((a, b) => b[1] - a[1]);
const topNav = Object.entries(navItemCounts).sort((a, b) => b[1] - a[1]);

const recurringNav = topNav.filter(([_, c]) => c >= 3).map(([k, _]) => k);

const master = {
  total_pages: pages.length,
  parse_errors: errors,
  recurring_nav_items: recurringNav,
  inferred_design_system: {
    top_color_signals: topColors.slice(0, 25),
    top_font_signals: topFonts.slice(0, 15),
    top_nav_items: topNav.slice(0, 25),
  },
  pages,
};

fs.writeFileSync(OUT, JSON.stringify(master, null, 2));
console.log(`Wrote ${OUT} (${pages.length} pages, ${errors.length} errors)`);

console.log('\n=== PAGE INDEX ===');
for (const p of pages) {
  console.log(`${p.page_id}  [${p.page_type || '?'}]  ${(p.page_name || '').slice(0, 70)}`);
}
console.log('\n=== RECURRING NAV (>=3) ===');
console.log(recurringNav.join(' | '));
console.log('\n=== TOP COLORS (top 15) ===');
topColors.slice(0, 15).forEach(([k, c]) => console.log(`  ${c}x  ${k}`));
console.log('\n=== TOP FONTS ===');
topFonts.slice(0, 10).forEach(([k, c]) => console.log(`  ${c}x  ${k}`));
if (errors.length) {
  console.log('\n=== ERRORS ===');
  errors.forEach(e => console.log(`  ${e.file}: ${e.error}`));
}
