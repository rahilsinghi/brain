---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:db0b509
ingested_at: 2026-04-10T12:03:43.576Z
parsed_at: 2026-04-10T12:03:43.576Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4LFJMjPihja3YUve3c"}
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
