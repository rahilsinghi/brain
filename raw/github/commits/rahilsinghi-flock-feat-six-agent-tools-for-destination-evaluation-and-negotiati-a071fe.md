---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:b1ef2c4
ingested_at: 2026-04-10T10:04:00.841Z
parsed_at: 2026-04-10T10:04:00.841Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3GR2mTkd8EkwQeD16t"}
compile_progress: null
---



# feat: six agent tools for destination evaluation and negotiation

- **Repo:** rahilsinghi/Flock
- **SHA:** b1ef2c4
- **Date:** 2026-03-21T14:23:18Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +450
- **Deletions:** -0

check-hard-constraints.ts — pure function, no model call
evaluate-destination.ts — Gemini scoring with reasons
get-aesthetic-match.ts — pgvector match_hotels RPC (3072-dim)
propose-compromise.ts — Gemini compromise generation
search-activities.ts — pre-seeded activities query
score-trip-decision.ts — per-user match scoring with surprise

Hard constraints checked deterministically. Hotel matching uses
cosine similarity against Gemini Vision embeddings.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
