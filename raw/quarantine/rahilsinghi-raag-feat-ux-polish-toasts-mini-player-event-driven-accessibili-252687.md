---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:a91a008
ingested_at: 2026-04-09T23:03:16.559Z
parsed_at: 2026-04-09T23:03:16.559Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2jK4Y1beoRkwwATgV"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:13.172Z
---






# feat: UX polish — toasts, mini player event-driven, accessibility

- **Repo:** rahilsinghi/raag
- **SHA:** a91a008
- **Date:** 2026-03-04T19:35:28Z
- **Author:** Rahil Singhi
- **Files changed:** 12
- **Additions:** +173
- **Deletions:** -40

- Add sonner toast notifications for chat errors, Spotify events, graph errors
- Rewrite SpotifyMiniPlayer to use event-driven state from SDK
- Add Noto Sans Devanagari font for Hindi lyrics
- Add prefers-reduced-motion, focus-visible keyboard nav styling
- Add ESC dismiss + exit animation for NodeDetailPanel
- Add scroll-mask to TimelineView
- Slide-up/slide-down CSS animations
- Disabled cursor style for chat input

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
