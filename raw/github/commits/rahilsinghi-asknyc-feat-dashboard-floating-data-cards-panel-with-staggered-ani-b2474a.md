---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:31d720a
ingested_at: 2026-04-10T15:04:13.408Z
parsed_at: 2026-04-10T15:04:13.408Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(dashboard): floating data cards panel with staggered animations

- **Repo:** rahilsinghi/askNYC
- **SHA:** 31d720a
- **Date:** 2026-03-28T18:55:24Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +415
- **Deletions:** -71

- Add MapCardOverlay: fixed scrollable left panel showing tool call pills,
  AI transcript bubble, and data cards with insight extracts
- Redesign MapFloatingCard with colored borders, detail text, stat pills
- Move camera PiP thumbnail to bottom-right to avoid overlap
- Cards animate in one-by-one spanning ~8-10s as data streams in
