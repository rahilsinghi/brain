---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:9afa7d7
ingested_at: 2026-04-13T17:05:37.821Z
parsed_at: 2026-04-13T17:05:37.821Z
compiled_to: "[[askNYC: Cinematic Map Overhaul and Fixes]]"
processed_at: 2026-04-13T17:38:31.921Z
retry_count: 0
last_error: null
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
