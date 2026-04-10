---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:5aebb70
ingested_at: 2026-04-10T07:03:28.805Z
parsed_at: 2026-04-10T07:03:28.805Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZufSXL14f2P4RSHJN7bd"}
compile_progress: null
---



# fix(scoreboard): auto-calibrate efficiency baseline and fix cwd

- **Repo:** rahilsinghi/ouroboros
- **SHA:** 5aebb70
- **Date:** 2026-04-03T15:17:37Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +2
- **Deletions:** -2

Set baseline_tokens=0 to mean 'use current size' (efficiency=1.0 when
no prior measurement exists). Prevents false-low efficiency scores.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
