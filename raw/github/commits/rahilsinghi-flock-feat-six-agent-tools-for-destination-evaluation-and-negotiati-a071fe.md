---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:b1ef2c4
ingested_at: 2026-04-09T04:03:38.426Z
parsed_at: 2026-04-09T04:03:38.426Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
