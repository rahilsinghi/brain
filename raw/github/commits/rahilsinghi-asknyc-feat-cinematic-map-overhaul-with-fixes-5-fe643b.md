---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:9afa7d7
ingested_at: 2026-04-09T01:03:46.915Z
parsed_at: 2026-04-09T01:03:46.915Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
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
