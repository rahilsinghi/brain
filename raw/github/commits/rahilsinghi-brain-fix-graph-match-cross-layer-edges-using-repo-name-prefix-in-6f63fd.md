---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:f9d0f75
ingested_at: 2026-04-13T18:05:31.323Z
parsed_at: 2026-04-13T18:05:31.323Z
compiled_to: "[[Graph Fix: Matching Cross-Layer Edges by Repository Name Prefix in Wiki IDs]]"
processed_at: 2026-04-13T18:07:04.406Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix(graph): match cross-layer edges using repo name prefix in wiki IDs

- **Repo:** rahilsinghi/brain
- **SHA:** f9d0f75
- **Date:** 2026-04-13T01:04:43Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +58
- **Deletions:** -13

The old extractRepoName expected exact wiki filenames like brain.md, but
actual wiki IDs are descriptive (karen-git-activity.md). Now checks if
the filename starts with a known code repo name (from graphify output).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
