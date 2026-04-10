---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:b09d238
ingested_at: 2026-04-09T22:03:19.553Z
parsed_at: 2026-04-09T22:03:19.553Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5fsXHJd6HmjQnhG1H"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:53.072Z
---






# feat: song deep dive visual overhaul — hero background, animated stats, smooth bar expand

- **Repo:** rahilsinghi/raag
- **SHA:** b09d238
- **Date:** 2026-03-15T20:10:10Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +423
- **Deletions:** -150

Phase 2 deep dive enhancements:
- Add HeroBackground: blurred album art ambient background with energy-based red glow
- Add PlaybackProgress: real-time playback progress bar under header using RAF
- Add AnimatedStat: count-up number animations for BPM, words, bars, diversity
- Enhance DeepDiveBar: framer-motion scale/glow on active bar, smooth expand/collapse
  with AnimatePresence, animated loading indicator for bar analysis
- Enhance SongSidebar: staggered motion.div reveal, animated energy/MC bars,
  hover zoom on album art, sequential section fade-ins
- Integrate hero background and playback progress into SongDeepDive layout
