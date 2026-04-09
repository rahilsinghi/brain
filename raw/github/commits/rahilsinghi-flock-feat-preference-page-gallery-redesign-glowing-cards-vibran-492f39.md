---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:0c432a6
ingested_at: 2026-04-09T04:03:38.416Z
parsed_at: 2026-04-09T04:03:38.416Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: preference page gallery redesign — glowing cards, vibrant colors, floating animation

- **Repo:** rahilsinghi/Flock
- **SHA:** 0c432a6
- **Date:** 2026-03-21T19:10:20Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +138
- **Deletions:** -94

Complete preference page overhaul:
- Gallery grid layout: cards side-by-side (2 columns on desktop)
- Each card has a unique glow color:
  Boundaries=teal, Travel Style=blue, Negotiation=violet, DNA=amber
- Cards have gradient backgrounds + colored box shadows
- Floating hover animation: cards lift + scale on hover
- Entrance: cards float in with slight rotation
- Compact hero: completeness ring + name side-by-side (saves space)
- Chat/voice widget: clean dark input bar with mic + send
- Travel DNA card spans full width with loved/avoided side-by-side
- All text uses hex colors (no broken HSL vars)
- Mobile responsive: single column on phones, 2 columns on tablets+

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
