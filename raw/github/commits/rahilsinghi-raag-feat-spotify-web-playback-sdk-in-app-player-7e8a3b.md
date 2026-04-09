---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:436129a
ingested_at: 2026-04-09T05:03:49.977Z
parsed_at: 2026-04-09T05:03:49.977Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: Spotify Web Playback SDK + in-app player

- **Repo:** rahilsinghi/raag
- **SHA:** 436129a
- **Date:** 2026-03-04T16:21:16Z
- **Author:** Rahil Singhi
- **Files changed:** 9
- **Additions:** +673
- **Deletions:** -0

- Add SpotifySDK component (loads SDK, initializes player, gets device_id)
- Add SpotifyMiniPlayer (floating bottom bar with play/pause/skip)
- Add PlayButton (reusable, shows play icon or external link fallback)
- Add SpotifyLoginButton with SDK status indicator (Ready/Connecting)
- Add SpotifyCallback (reads tokens from URL fragment after OAuth)
- Add Zustand spotify-store with auth, player state, token refresh
- Add OAuth callback API route (server-side token exchange)
- Add Spotify Web Playback SDK type declarations
- Integrate play buttons into SongCard, SongContextCard, NodeDetailPanel
- Add Spotify components to chat page and universe page

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
