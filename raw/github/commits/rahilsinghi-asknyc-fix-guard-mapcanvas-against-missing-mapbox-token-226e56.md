---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:4922735
ingested_at: 2026-04-09T01:03:46.915Z
parsed_at: 2026-04-09T01:03:46.915Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# fix: guard MapCanvas against missing Mapbox token

- **Repo:** rahilsinghi/askNYC
- **SHA:** 4922735
- **Date:** 2026-03-28T04:52:05Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +113
- **Deletions:** -101

Dynamic import mapbox-gl instead of top-level import to prevent
page crash when NEXT_PUBLIC_MAPBOX_TOKEN is not set. Shows fallback
UI instead of throwing.
