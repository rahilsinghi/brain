---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:9da373c
ingested_at: 2026-04-09T23:03:16.570Z
parsed_at: 2026-04-09T23:03:16.570Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3tDd1XBbW6jLGfmZb"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:28.850Z
---






# chore: project scaffolding, docker-compose, and startup scripts

- **Repo:** rahilsinghi/raag
- **SHA:** 9da373c
- **Date:** 2026-03-04T00:15:19Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +1314
- **Deletions:** -0

- .gitignore for Python, Node, data, env, models
- .env.example with all required env vars
- docker-compose.yml for Qdrant vector DB
- start.sh for one-command local startup (Postgres, Redis, Qdrant, backend, frontend)
- scripts/download-album.sh CLI wrapper for audio downloads
- raag-project-plan.md with full Phase 1 implementation plan

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
