---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:721975a
ingested_at: 2026-04-09T22:03:19.547Z
parsed_at: 2026-04-09T22:03:19.547Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3jKqWCFEbEwZaSA3S"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:26.772Z
---






# feat: round gate enforcement and session utilities

- **Repo:** rahilsinghi/Flock
- **SHA:** 721975a
- **Date:** 2026-03-21T14:23:03Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +159
- **Deletions:** -0

round-gate.ts — enforceRoundInput (thematic gates per round),
checkAllReady, advanceRound (advances or triggers mediator)
colors.ts — assignColor with ordered color sequence + hex map
room-code.ts — generateRoomCode (CITY-N format)

Round 1: chips only. Round 2: voice/photo/text only. Round 3: exactly
dealbreaker + delight. Server-side enforcement prevents wrong input types.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
