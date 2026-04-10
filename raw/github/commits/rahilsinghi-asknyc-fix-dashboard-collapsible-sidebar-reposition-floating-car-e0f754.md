---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:e46df7f
ingested_at: 2026-04-10T15:04:13.413Z
parsed_at: 2026-04-10T15:04:13.413Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(dashboard): collapsible sidebar + reposition floating cards

- **Repo:** rahilsinghi/askNYC
- **SHA:** e46df7f
- **Date:** 2026-03-28T16:41:17Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +73
- **Deletions:** -26

Cards were hidden behind sidebar (left-4 vs 200px sidebar). Moved to
vertically centered with dynamic left offset. Sidebar now collapses
to icon-only 56px rail via chevron toggle.
