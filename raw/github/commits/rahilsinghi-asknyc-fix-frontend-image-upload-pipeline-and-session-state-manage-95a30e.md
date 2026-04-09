---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:47d53aa
ingested_at: 2026-04-09T03:18:47.661Z
parsed_at: 2026-04-09T03:18:47.661Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
