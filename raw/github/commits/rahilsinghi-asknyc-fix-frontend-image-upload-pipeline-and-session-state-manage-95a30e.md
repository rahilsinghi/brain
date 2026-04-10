---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:47d53aa
ingested_at: 2026-04-10T08:03:40.143Z
parsed_at: 2026-04-10T08:03:40.143Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk32svZSjyipdZxeYP7"}
compile_progress: null
---



# fix(frontend): image upload pipeline and session state management

- **Repo:** rahilsinghi/askNYC
- **SHA:** 47d53aa
- **Date:** 2026-03-28T02:45:19Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +77
- **Deletions:** -35

- Fix image resize to 768x768 JPEG via canvas (handles large PNGs)
- Move file input outside conditional to prevent unmount issues
- Reset stale tool badges and cards on WS reconnect
- Add WS message logging for debugging
- Wire uploadedImage state through dashboard → CameraFeed → IntelligenceBrief
