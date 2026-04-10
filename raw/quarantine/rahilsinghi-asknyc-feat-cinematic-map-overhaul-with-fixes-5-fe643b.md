---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:9afa7d7
ingested_at: 2026-04-10T02:04:52.499Z
parsed_at: 2026-04-10T02:04:52.499Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4zHH8Tyr9jhNB8PGU"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:43.807Z
---






# feat: cinematic map overhaul with fixes (#5)

- **Repo:** rahilsinghi/askNYC
- **SHA:** 9afa7d7
- **Date:** 2026-03-28T14:04:36Z
- **Author:** Rahil Singhi
- **Files changed:** 20
- **Additions:** +1042
- **Deletions:** -673

Merges PR #5 cinematic map + landmark glow with fixes:
- MiniMap: MAPBOX_TOKEN guard, dynamic import, backend pin sync
- MapEvidenceCard: static Tailwind classes (no dynamic interpolation)
- Remove unused deps (three, @googlemaps/js-api-loader)
- Resolve merge conflicts with PR #4 camera capture
