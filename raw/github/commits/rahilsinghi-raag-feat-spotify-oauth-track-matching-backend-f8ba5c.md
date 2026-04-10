---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:d977528
ingested_at: 2026-04-10T04:04:34.859Z
parsed_at: 2026-04-10T04:04:34.859Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRokhNsusWgASu2zi52"}
compile_progress: null
---



# feat: Spotify OAuth + track matching backend

- **Repo:** rahilsinghi/raag
- **SHA:** d977528
- **Date:** 2026-03-04T16:20:46Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +298
- **Deletions:** -0

- Add /api/spotify endpoints: auth-url, token, refresh, search,
  match-all, track/:id
- Authorization Code flow with client_secret (no PKCE)
- Auto-match all DB songs to Spotify tracks via search API
- Add spotify_track_id and spotify_preview_url columns to songs table
- Include spotify_track_id in search results and graph node metadata
- Add Spotify config vars (client_id, client_secret, redirect_uri)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
