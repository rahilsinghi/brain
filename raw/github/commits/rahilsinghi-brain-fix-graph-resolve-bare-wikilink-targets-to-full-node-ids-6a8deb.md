---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:f909ac1
ingested_at: 2026-04-13T18:05:31.364Z
parsed_at: 2026-04-13T18:05:31.364Z
compiled_to: "[[Fix: Resolve Bare Wikilink Targets to Full Node IDs in Brain Graph]]"
processed_at: 2026-04-13T18:08:11.519Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix(graph): resolve bare wikilink targets to full node IDs

- **Repo:** rahilsinghi/brain
- **SHA:** f909ac1
- **Date:** 2026-04-10T19:18:02Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +60
- **Deletions:** -1

normalizeTarget was producing 'proj-karen.md' but node IDs are
'projects/proj-karen.md'. Build filename→ID lookup after scanning
all nodes, resolve targets before dedup. Fixes empty links array.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
