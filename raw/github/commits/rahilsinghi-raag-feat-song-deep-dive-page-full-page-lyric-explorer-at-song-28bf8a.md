---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:cca23b0
ingested_at: 2026-04-10T04:04:34.857Z
parsed_at: 2026-04-10T04:04:34.857Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRo9FuyLyPK4cN5tRQG"}
compile_progress: null
---



# feat: Song Deep Dive page — full-page lyric explorer at /song/[id]

- **Repo:** rahilsinghi/raag
- **SHA:** cca23b0
- **Date:** 2026-03-07T00:14:08Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +921
- **Deletions:** -0

Premium song exploration experience with:
- Annotated lyrics grouped by section with MC color-coding
- Color-coded rhyme word highlights with group legend
- Click any bar to expand AI-powered analysis (translation, meaning,
  wordplay, cultural refs, flow notes, context)
- Synced mode with Spotify playback — bars highlight and auto-scroll
  as the song plays (auto-switches when Spotify starts)
- Rich sidebar: album art, stats grid (BPM, key, energy, duration,
  words, lexical diversity), MC split bars, topics, entity mentions
  with stance coloring, featured artists
- Entity mentions link to Universe graph for exploration
- Responsive: sidebar hidden on mobile, 2-column on desktop

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
