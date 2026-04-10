---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:4922735
ingested_at: 2026-04-10T08:03:40.141Z
parsed_at: 2026-04-10T08:03:40.141Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2qV55Mtn81MLhcNtX"}
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
