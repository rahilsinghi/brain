---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:bdcd892
ingested_at: 2026-04-13T18:05:31.385Z
parsed_at: 2026-04-13T18:05:31.385Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(ui): solid backgrounds for panel/tooltip, softer glow sprites

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** bdcd892
- **Date:** 2026-04-10T19:43:27Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +223
- **Deletions:** -81

backdrop-filter:blur() does not work over WebGL canvas. Replaced
glass class with solid opaque #0c0c1d backgrounds and inline styles
for all text colors to guarantee visibility. Switched glow from
sphere to plane with canvas radial gradient texture for soft edges.
Reduced glow scale 4→2.5, opacity 0.12→0.08.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
