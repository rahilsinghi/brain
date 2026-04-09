---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/neon-exchange:2480eed
ingested_at: 2026-04-09T05:03:49.987Z
parsed_at: 2026-04-09T05:03:49.987Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: Add pre-computed snapshot cache for sub-millisecond API responses

- **Repo:** rahilsinghi/neon-exchange
- **SHA:** 2480eed
- **Date:** 2026-03-07T22:03:36Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +316
- **Deletions:** -89

- Create services/cache.py: double-buffered WorldSnapshot with atomic
  pointer swap, background rebuild every 2s, pre-serialized JSON for
  all endpoints (bootstrap, market_state, districts, ticker lookup)
- Update main.py: FastAPI lifespan starts/stops cache background task
- Update world_router.py: SSE reads pre-serialized bootstrap_json
  instead of computing inline (zero json.dumps in hot path)
- Update market_router.py: all endpoints read from cache snapshot,
  add /api/debug/cache-stats diagnostics endpoint
- Update orchestrator.py: agent tools read from cache, context builder
  includes signals summary (ready for Phase 2)

Benchmarks: 0ns read latency, 1ms rebuild cost, 19KB bootstrap payload.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
