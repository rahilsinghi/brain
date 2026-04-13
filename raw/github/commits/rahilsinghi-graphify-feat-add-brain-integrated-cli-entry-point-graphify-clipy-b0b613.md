---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/graphify:c85cb4c
ingested_at: 2026-04-13T18:05:31.388Z
parsed_at: 2026-04-13T18:05:31.388Z
compiled_to: "[[Graphify CLI Entry Point: Brain Integration]]"
processed_at: 2026-04-13T18:06:50.923Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat: add Brain-integrated CLI entry point (graphify_cli.py)

- **Repo:** rahilsinghi/graphify
- **SHA:** c85cb4c
- **Date:** 2026-04-10T23:20:47Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +207
- **Deletions:** -0

Chains the full Graphify pipeline (detect -> extract -> build -> cluster ->
analyze -> report -> export) into a single CLI callable by Brain's daemon.

Outputs per repo: architecture.md report, graph.json, and per-file summary
markdown files for LanceDB embedding. --semantic flag uses cached results
only (v1 limitation, logs warning for uncached files).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
