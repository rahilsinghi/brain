---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:5aebb70
ingested_at: 2026-04-09T00:04:28.496Z
parsed_at: 2026-04-09T00:04:28.496Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
