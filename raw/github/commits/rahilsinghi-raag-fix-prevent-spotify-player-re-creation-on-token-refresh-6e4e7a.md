---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:c591332
ingested_at: 2026-04-09T04:03:38.430Z
parsed_at: 2026-04-09T04:03:38.430Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix: prevent Spotify player re-creation on token refresh

- **Repo:** rahilsinghi/raag
- **SHA:** c591332
- **Date:** 2026-03-15T19:23:24Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +89
- **Deletions:** -78

Remove accessToken from useEffect deps so the player isn't torn down
and recreated every time the OAuth token refreshes. getOAuthToken
callback calls getValidToken() dynamically. Also handle SDK hot-reload
and guard cleanup against null player.
