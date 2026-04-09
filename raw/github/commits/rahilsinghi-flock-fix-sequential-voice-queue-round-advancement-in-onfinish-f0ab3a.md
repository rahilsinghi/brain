---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:3861106
ingested_at: 2026-04-09T04:03:38.413Z
parsed_at: 2026-04-09T04:03:38.413Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
