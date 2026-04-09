---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:1d9e1e7
ingested_at: 2026-04-09T01:03:46.897Z
parsed_at: 2026-04-09T01:03:46.897Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# fix(audio): sync commentary timing, add level-aware ad-libs

- **Repo:** rahilsinghi/karen
- **SHA:** 1d9e1e7
- **Date:** 2026-04-04T19:55:17Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +90
- **Deletions:** -14

- Await level-complete commentary TTS before starting ad-libs
  (fixes audio arriving late and feeling mismatched with current level)
- Add LEVEL_ADLIBS dict: 2 channel-specific lines per level
  (e.g. L7: "Discord pinged. Everyone heard that.")
- First ad-lib is always level-specific, remaining are personality-generic
- For 10s demo intervals: fixed timing at 3s and 7s for tight sync
- Doubled ad-lib pool: 15 per personality (was 7), quirkier lines
