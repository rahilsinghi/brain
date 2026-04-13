---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:3861106
ingested_at: 2026-04-13T00:04:31.107Z
parsed_at: 2026-04-13T00:04:31.107Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24doZKv1qUuzftXH2bK"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:22.544Z
---






# fix: sequential voice queue + round advancement in onFinish

- **Repo:** rahilsinghi/Flock
- **SHA:** 3861106
- **Date:** 2026-03-21T20:06:46Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +57
- **Deletions:** -40

Voice queue:
- Replaced setTimeout stagger with proper sequential queue
- Each voice plays AFTER the previous one finishes (source.onended)
- 800ms pause between voices for natural pacing
- Ambient music ducks during voice, restores between readings
- No more echo — only one voice can play at a time

Round advancement fix:
- advanceRound() now called inside personal agent's onFinish callback
  (not in a background pipeTo that Vercel may kill)
- This ensures round advances reliably even on serverless

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
