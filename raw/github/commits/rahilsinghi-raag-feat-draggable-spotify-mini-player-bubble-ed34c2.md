---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:2b5f9e9
ingested_at: 2026-04-09T05:03:49.971Z
parsed_at: 2026-04-09T05:03:49.971Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
