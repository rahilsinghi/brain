---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:eb99912
ingested_at: 2026-04-10T02:04:52.502Z
parsed_at: 2026-04-10T02:04:52.502Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3dkUdkiHqpM7dGoLQ"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:25.434Z
---






# feat(frontend): Next.js 15 dashboard with real-time WebSocket UI

- **Repo:** rahilsinghi/askNYC
- **SHA:** eb99912
- **Date:** 2026-03-28T00:32:52Z
- **Author:** Rahil Singhi
- **Files changed:** 27
- **Additions:** +8960
- **Deletions:** -0

- Dashboard page: camera feed, Mapbox map, intelligence brief, data cards
- Remote page: phone camera + mic capture with WebSocket relay
- Archive and insights pages
- WebSocket hooks with auto-reconnect and audio playback
- Mapbox GL JS with animated markers and dark theme
