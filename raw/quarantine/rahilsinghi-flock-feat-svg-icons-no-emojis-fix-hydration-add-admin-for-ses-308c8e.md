---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:a88d054
ingested_at: 2026-04-09T22:03:19.503Z
parsed_at: 2026-04-09T22:03:19.503Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3YrYJpF1M3E1Cur76"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:24.320Z
---






# feat: SVG icons (no emojis), fix hydration, add /admin for session creation

- **Repo:** rahilsinghi/Flock
- **SHA:** a88d054
- **Date:** 2026-03-21T17:06:36Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +264
- **Deletions:** -228

Preference room:
- Replace all emojis with clean SVG line icons (wallet, plane, compass, etc.)
- Fix hydration mismatch: render null until mounted on client
- Professional icon set consistent with dark UI aesthetic

Admin page (/admin):
- Create sessions with one click
- Shows room code in large monospace gold text
- Copy code button + Open Host Screen link
- Simple flow: create session → tell judges the code verbally

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
