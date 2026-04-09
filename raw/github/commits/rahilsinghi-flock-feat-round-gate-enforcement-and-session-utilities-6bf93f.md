---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:721975a
ingested_at: 2026-04-09T04:03:38.426Z
parsed_at: 2026-04-09T04:03:38.426Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
