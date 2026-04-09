---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:e46df7f
ingested_at: 2026-04-09T01:03:46.913Z
parsed_at: 2026-04-09T01:03:46.913Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
