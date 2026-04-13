---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:db0b509
ingested_at: 2026-04-13T16:05:10.291Z
parsed_at: 2026-04-13T16:05:10.291Z
compiled_to: "[[Scoreboard Fixes for Correctness Scoring in Ouroboros]]"
processed_at: 2026-04-13T16:08:27.640Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix(scoreboard): fix test cwd and summary parsing for correctness scoring

- **Repo:** rahilsinghi/ouroboros
- **SHA:** db0b509
- **Date:** 2026-04-03T15:09:55Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +17
- **Deletions:** -9

Run tests from repo root (parent of target_path) so relative test paths
resolve. Parse passed/failed counts from pytest summary line instead of
just a boolean. Correctness now scores 0.99 on the real codebase.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
