---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:e0c5737
ingested_at: 2026-04-13T18:05:31.331Z
parsed_at: 2026-04-13T18:05:31.331Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(graph): loadGraphifyGraphs parses NetworkX JSON into Brain node/link format

- **Repo:** rahilsinghi/brain
- **SHA:** e0c5737
- **Date:** 2026-04-12T17:06:51Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +330
- **Deletions:** -0

Walks graphifyOutputDir for {repo}-graph.json files, maps NetworkX node_link_data
to GraphNode[]/GraphLink[] with code:// URI prefix, layer=code, per-repo isolation,
symbol-level # fragment support, malformed-JSON skip, and missing-dir guard.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
