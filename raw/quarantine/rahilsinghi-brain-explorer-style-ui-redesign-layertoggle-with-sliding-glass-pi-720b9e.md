---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:8bb976a
ingested_at: 2026-04-13T16:05:10.273Z
parsed_at: 2026-04-13T16:05:10.273Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24o5THyxWhV4SjNQAZz"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:28.385Z
---






# style(ui): redesign LayerToggle with sliding glass pill

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** 8bb976a
- **Date:** 2026-04-13T01:57:04Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +48
- **Deletions:** -12

Larger touch target (8px 24px padding), moved down to top:24px,
glassmorphic container with sliding pill indicator that animates
between options via cubic-bezier transition.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
