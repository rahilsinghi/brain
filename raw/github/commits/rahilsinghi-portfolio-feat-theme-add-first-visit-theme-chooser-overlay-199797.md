---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:33b4864
ingested_at: 2026-04-13T18:05:31.396Z
parsed_at: 2026-04-13T18:05:31.396Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(theme): add first-visit theme chooser overlay

- **Repo:** rahilsinghi/portfolio
- **SHA:** 33b4864
- **Date:** 2026-03-25T02:41:36Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +241
- **Deletions:** -0

Full-screen blurred overlay appears after boot screen on first visit.
Two floating cards (Dark/Light) with mini UI previews, scanlines, and
corner brackets bob with offset phases. Selected card scales up, other
fades, overlay exits smoothly. Persists choice via localStorage so it
only shows once. Includes skip option and reduced-motion support.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
