---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:10fc431
ingested_at: 2026-04-13T18:05:31.396Z
parsed_at: 2026-04-13T18:05:31.396Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# refactor(components): convert all inline colors to theme-aware tokens

- **Repo:** rahilsinghi/portfolio
- **SHA:** 10fc431
- **Date:** 2026-03-25T02:41:23Z
- **Author:** Rahil Singhi
- **Files changed:** 13
- **Additions:** +201
- **Deletions:** -64

Add sun/moon toggle to Nav with animated icon swap (desktop + mobile).
Replace hardcoded rgba(0,255,65,...) with CSS variables in SVG/inline
styles (Experience, CircuitDivider, FeaturedProjects, HackathonProjects,
CursorGlow, SectionDots). Add useTheme + getAccentRGB/getBgRGB to
canvas components (BinaryDissolve, CodeTypingBg, ParticleField,
KnowledgeGraph, BackgroundGrid, ReactiveAurora, CursorCodeTrail).
Update Nav overlay/backdrop to use theme variables.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
