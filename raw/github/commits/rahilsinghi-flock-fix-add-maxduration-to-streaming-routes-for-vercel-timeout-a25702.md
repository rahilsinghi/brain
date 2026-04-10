---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:8ba77d8
ingested_at: 2026-04-10T03:04:49.731Z
parsed_at: 2026-04-10T03:04:49.731Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuMEx762TU3cbttvdu9V"}
compile_progress: null
---



# fix: add maxDuration to streaming routes for Vercel timeout

- **Repo:** rahilsinghi/Flock
- **SHA:** 8ba77d8
- **Date:** 2026-03-21T19:45:41Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +7
- **Deletions:** -0

Vercel Hobby defaults to 10s function timeout. Our streaming routes:
- /api/session/mediate: needs 60s for mediator (set maxDuration=60)
- /api/session/round: needs 30s for agent streaming (set maxDuration=60)
- /api/voice/speak: needs 15s for ElevenLabs (set maxDuration=30)

Without this, the mediator was timing out on Vercel, setting status
to 'complete' via onFinish but never calling finalize_trip.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
