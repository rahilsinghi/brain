---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:31d720a
ingested_at: 2026-04-10T02:04:52.497Z
parsed_at: 2026-04-10T02:04:52.497Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5bV71xjL9aKui8iqJ"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:52.085Z
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
