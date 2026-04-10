---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:10fc431
ingested_at: 2026-04-09T23:03:16.540Z
parsed_at: 2026-04-09T23:03:16.540Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3daZDE1PwXfN9Ra8u"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:25.602Z
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
