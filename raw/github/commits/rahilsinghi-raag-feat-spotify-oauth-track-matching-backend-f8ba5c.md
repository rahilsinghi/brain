---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:d977528
ingested_at: 2026-04-13T17:05:37.835Z
parsed_at: 2026-04-13T17:05:37.835Z
compiled_to: "[[Spotify OAuth and Track Matching Backend Integration in raag]]"
processed_at: 2026-04-13T17:39:10.552Z
retry_count: 0
last_error: null
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
