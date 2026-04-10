---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:c591332
ingested_at: 2026-04-10T04:04:34.856Z
parsed_at: 2026-04-10T04:04:34.856Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRp2RRybbnbgwRQSFXw"}
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
