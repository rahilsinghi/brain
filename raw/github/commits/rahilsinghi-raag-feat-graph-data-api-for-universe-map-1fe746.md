---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:616db32
ingested_at: 2026-04-09T05:03:49.978Z
parsed_at: 2026-04-09T05:03:49.978Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: graph data API for Universe Map

- **Repo:** rahilsinghi/raag
- **SHA:** 616db32
- **Date:** 2026-03-04T16:18:33Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +461
- **Deletions:** -1

- Add GET /api/graph/data with view_mode, album_id, mc filters
- Add POST /api/graph/refresh to clear cache and recompute
- Build nodes for albums, songs, MCs, features, entities, topics
- Generate trivia/summary text per node type
- In-memory cache with 5-min TTL
- Register graph + songs + spotify routers in main.py

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
