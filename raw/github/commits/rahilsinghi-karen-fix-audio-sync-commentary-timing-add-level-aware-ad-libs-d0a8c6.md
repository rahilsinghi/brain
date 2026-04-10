---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:1d9e1e7
ingested_at: 2026-04-10T12:03:43.579Z
parsed_at: 2026-04-10T12:03:43.579Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4LhD5pGnB31vsSQcAe"}
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
