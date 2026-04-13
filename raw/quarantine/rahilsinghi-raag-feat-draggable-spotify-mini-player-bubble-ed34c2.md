---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:2b5f9e9
ingested_at: 2026-04-13T16:05:10.313Z
parsed_at: 2026-04-13T16:05:10.313Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24kYwh48oVXdiD5CVfK"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:54.103Z
---






# feat: draggable Spotify mini player bubble

- **Repo:** rahilsinghi/raag
- **SHA:** 2b5f9e9
- **Date:** 2026-03-06T22:39:38Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +243
- **Deletions:** -84

Rework SpotifyMiniPlayer into a draggable floating bubble that expands
on click. Snaps to home position (right of chat input), clamps to
viewport, and integrates RhymeSheet toggle. Add SpotifyProvider wrapper
and play error handling in spotify-store.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
