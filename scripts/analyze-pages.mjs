// Analyze each PNG page with VLM and extract detailed design specs
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const ANALYSIS_DIR = '/home/z/my-project/analysis';
const OUT_DIR = '/home/z/my-project/analysis/specs';
fs.mkdirSync(OUT_DIR, { recursive: true });

const PROMPT = `You are analyzing ONE page of a multi-page website. Extract an EXTREMELY DETAILED design + content specification for this page so a developer can reproduce it pixel-perfectly.

Return ONLY valid JSON (no markdown, no prose outside JSON) with this exact schema:
{
  "page_id": "string (e.g. 'page-01')",
  "page_type": "string — one of: home | landing | about | pricing | features | blog_list | blog_post | docs | contact | login | signup | dashboard | settings | profile | checkout | product | portfolio | gallery | faq | careers | other",
  "page_name": "string — a short human-readable name for this page (e.g. 'Homepage hero', 'Pricing table', 'Blog index')",
  "purpose": "string — 1-2 sentence summary of what this page accomplishes",
  "navigation_to": ["list of other page_ids or page names this page links to based on nav/buttons/CTAs"],
  "color_palette": {
    "background": "hex",
    "surface": "hex (cards / panels)",
    "text_primary": "hex",
    "text_secondary": "hex",
    "accent": "hex",
    "border": "hex"
  },
  "typography": {
    "heading_font": "string (best-guess family)",
    "body_font": "string",
    "heading_size_px": number,
    "body_size_px": number,
    "heading_weight": number,
    "body_weight": number
  },
  "layout": {
    "max_width_px": number,
    "container": "full-width | centered | grid",
    "columns": number,
    "header_present": boolean,
    "footer_present": boolean,
    "sidebar_present": boolean,
    "sections": ["ordered list of top-to-bottom sections on the page"]
  },
  "header": {
    "present": boolean,
    "logo_text": "string (exact text in the logo)",
    "nav_items": ["exact nav item labels"],
    "right_side": ["buttons / icons on the right side, e.g. 'Sign in', 'Get started', avatar, search icon"],
    "background_color": "hex",
    "sticky": "boolean (assume sticky unless clearly not)"
  },
  "hero": {
    "present": boolean,
    "headline": "exact text",
    "subheadline": "exact text",
    "primary_cta": { "label": "string", "style": "filled | outlined | ghost" },
    "secondary_cta": { "label": "string", "style": "filled | outlined | ghost" } | null,
    "image_or_illustration": "description",
    "background": "solid color | gradient | image"
  },
  "content_sections": [
    {
      "name": "section name",
      "type": "features_grid | testimonials | pricing_table | stats | cta_band | faq | content_blocks | form | table | media_gallery | steps | logomark_grid | contact_info | other",
      "heading": "exact heading text",
      "subheading": "exact subheading text",
      "items": ["list of items/cards/features with exact text"],
      "layout": "grid-N | carousel | rows | columns | masonry"
    }
  ],
  "footer": {
    "present": boolean,
    "columns": ["list of column headers"],
    "links": ["list of footer links"],
    "copyright_text": "exact text",
    "social_icons": ["twitter | github | linkedin | instagram | youtube | etc"],
    "background_color": "hex"
  },
  "forms": [
    { "name": "string", "fields": [{ "label": "string", "type": "text | email | password | tel | select | textarea | checkbox | radio", "placeholder": "string", "required": boolean }], "submit_button_label": "string" }
  ],
  "buttons": [
    { "label": "string", "style": "primary | secondary | ghost | outline", "location": "string" }
  ],
  "icons": ["list of icons used and where, e.g. 'check-circle in feature card', 'arrow-right in CTA'"],
  "images": ["description of each image/photo/illustration on the page"],
  "animations_interactions": ["list of likely animations or interactions: hover, scroll reveal, carousel, accordion, modal trigger, sticky scroll, parallax, etc."],
  "responsive_cues": ["any visible mobile/tablet layout hints"],
  "notes": "any extra details that don't fit elsewhere"
}`;

async function analyzeOne(zai, file) {
  const buf = fs.readFileSync(file);
  const b64 = buf.toString('base64');
  const dataUrl = `data:image/png;base64,${b64}`;

  const resp = await zai.chat.completions.createVision({
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: PROMPT },
          { type: 'image_url', image_url: { url: dataUrl } }
        ]
      }
    ],
    thinking: { type: 'disabled' }
  });

  let content = resp.choices?.[0]?.message?.content || '';

  // Strip markdown code fences if present
  content = content.trim();
  if (content.startsWith('```')) {
    content = content.replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
  }

  const baseName = path.basename(file, '.png');
  const outPath = path.join(OUT_DIR, `${baseName}.json`);

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    parsed = { parse_error: String(e), raw: content };
  }
  fs.writeFileSync(outPath, JSON.stringify(parsed, null, 2));
  console.log(`[OK] ${baseName} -> ${outPath}`);
  return parsed;
}

async function runBatch(zai, files) {
  // 4 concurrent requests
  const results = [];
  const concurrency = 4;
  for (let i = 0; i < files.length; i += concurrency) {
    const batch = files.slice(i, i + concurrency);
    const settled = await Promise.allSettled(batch.map((f) => analyzeOne(zai, f)));
    for (const r of settled) {
      if (r.status === 'rejected') {
        console.error('[ERR]', r.reason?.message || r.reason);
      }
    }
  }
}

async function main() {
  const zai = await ZAI.create();
  const files = fs
    .readdirSync(ANALYSIS_DIR)
    .filter((f) => /^page-\d+\.png$/.test(f))
    .sort()
    .map((f) => path.join(ANALYSIS_DIR, f));

  console.log(`Analyzing ${files.length} pages...`);
  await runBatch(zai, files);
  console.log('DONE.');
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(1);
});
