---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:3008f74
ingested_at: 2026-04-09T04:03:38.419Z
parsed_at: 2026-04-09T04:03:38.419Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: full Lovable design system integration — blue primary, glass panels, void aesthetic

- **Repo:** rahilsinghi/Flock
- **SHA:** 3008f74
- **Date:** 2026-03-21T17:40:26Z
- **Author:** Rahil Singhi
- **Files changed:** 10
- **Additions:** +947
- **Deletions:** -632

Design system overhaul (globals.css):
- Blue primary (hsl 210 100% 65%) replaces gold
- Roam glow tokens: blue, teal, amber, rose, violet
- Glass panel + glass-panel-subtle utility classes
- Void radial backgrounds with blue ambient glow
- Space Grotesk as display font (replaces Cormorant)
- Text-luminous for glowing text effects
- Glow effects: glow-blue, glow-teal, glow-amber, glow-rose
- Custom scrollbar matching void aesthetic

All pages updated:
- Login: blue ambient glow, glass card inputs, blue CTA
- Preference: blue completeness ring, blue tags, glass-panel-subtle cards
- Admin: glass-panel cards, blue CTA, teal start button
- Phone room: void-deep background, glass lobby cards, blue glow text
- Agent colors: HSL values matching roam glow system

New deps: @react-three/fiber, @react-three/drei, three, clsx, tailwind-merge,
class-variance-authority, lucide-react (ready for Three.js sphere + shadcn)

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
