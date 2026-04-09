---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:d5dee54
ingested_at: 2026-04-09T04:03:38.428Z
parsed_at: 2026-04-09T04:03:38.428Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Initial commit: project docs + pre-hackathon database seeding

- **Repo:** rahilsinghi/Flock
- **SHA:** d5dee54
- **Date:** 2026-03-21T13:53:59Z
- **Author:** Rahil Singhi
- **Files changed:** 42
- **Additions:** +28005
- **Deletions:** -0

- Project documentation: idea, technical spec, build plan, demo script, CLAUDE.md
- Pre-seeded Supabase database (8 cities, 194 hotels, 160 activities, 240 FAQs, 5 demo users)
- Hotel Vision pipeline: Google Places → Gemini Vision → 3072-dim embeddings
- 173/194 hotels enriched with real photos + aesthetic analysis
- All similarity functions deployed (match_hotels, match_neighborhoods, match_cities)

Made-with: Cursor
