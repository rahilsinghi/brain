---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:0a0d467
ingested_at: 2026-04-13T18:05:31.329Z
parsed_at: 2026-04-13T18:05:31.329Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(graph): apply wiki:// URI prefix and layer field at cache boundary

- **Repo:** rahilsinghi/brain
- **SHA:** 0a0d467
- **Date:** 2026-04-12T17:11:34Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +61
- **Deletions:** -0

scanWiki() stays path-based internally; wiki:// prefix and layer: 'wiki'
are stamped on all nodes/links in rebuildGraphCache after UMAP generation.
Link defaults (relation, confidence, confidence_score) also applied here.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
