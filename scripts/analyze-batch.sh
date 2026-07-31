#!/bin/bash
# Analyze each PNG using the z-ai CLI vision command in controlled batches
set -u

ANALYSIS_DIR="/home/z/my-project/analysis"
OUT_DIR="/home/z/my-project/analysis/specs"
mkdir -p "$OUT_DIR"

PROMPT='You are analyzing ONE page of a multi-page website. Extract an EXTREMELY DETAILED design + content specification for this page so a developer can reproduce it pixel-perfectly. Return ONLY valid JSON (no markdown fences) with this schema: { "page_id": "page-XX", "page_type": "home|landing|about|pricing|features|blog_list|blog_post|docs|contact|login|signup|dashboard|settings|profile|checkout|product|portfolio|gallery|faq|careers|other", "page_name": "short name", "purpose": "1-2 sentence summary", "navigation_to": ["other page_ids or names this links to"], "color_palette": { "background": "hex", "surface": "hex", "text_primary": "hex", "text_secondary": "hex", "accent": "hex", "border": "hex" }, "typography": { "heading_font": "string", "body_font": "string", "heading_size_px": 0, "body_size_px": 0, "heading_weight": 0, "body_weight": 0 }, "layout": { "max_width_px": 0, "container": "full-width|centered|grid", "columns": 0, "header_present": true, "footer_present": true, "sidebar_present": false, "sections": ["ordered sections top-to-bottom"] }, "header": { "present": true, "logo_text": "string", "nav_items": ["exact labels"], "right_side": ["buttons/icons"], "background_color": "hex", "sticky": true }, "hero": { "present": true, "headline": "exact text", "subheadline": "exact text", "primary_cta": { "label": "string", "style": "filled|outlined|ghost" }, "secondary_cta": { "label": "string", "style": "filled|outlined|ghost" } }, "content_sections": [{ "name": "section name", "type": "features_grid|testimonials|pricing_table|stats|cta_band|faq|content_blocks|form|table|media_gallery|steps|logomark_grid|contact_info|other", "heading": "exact heading", "subheading": "exact subheading", "items": ["list of items with exact text"], "layout": "grid-N|carousel|rows|columns|masonry" }], "footer": { "present": true, "columns": ["column headers"], "links": ["footer links"], "copyright_text": "exact", "social_icons": ["twitter|github|linkedin|instagram|youtube"], "background_color": "hex" }, "forms": [{ "name": "string", "fields": [{ "label": "string", "type": "text|email|password|tel|select|textarea|checkbox|radio", "placeholder": "string", "required": true }], "submit_button_label": "string" }], "buttons": [{ "label": "string", "style": "primary|secondary|ghost|outline", "location": "string" }], "icons": ["list"], "images": ["description of each image"], "animations_interactions": ["list"], "responsive_cues": ["list"], "notes": "extra details" }'

# Process all pages with 2 concurrent at a time
process_page() {
  local img="$1"
  local base
  base=$(basename "$img" .png)
  local out="$OUT_DIR/${base}.json"
  if [ -f "$out" ] && [ "$(stat -c%s "$out")" -gt 500 ]; then
    echo "[SKIP] $base already done"
    return
  fi
  echo "[PROC] $base"
  z-ai vision -p "$PROMPT" -i "$img" -o "$out" 2>&1 | tail -2
}

export -f process_page
export OUT_DIR
export PROMPT

# Use xargs with 2 parallel jobs (manageable load)
ls "$ANALYSIS_DIR"/page-*.png | sort | xargs -I {} -P 2 bash -c 'process_page "$@"' _ {}

echo "DONE"
ls -la "$OUT_DIR" | head -30
