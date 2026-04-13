---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/graphify:5d3b88f
ingested_at: 2026-04-13T18:05:31.387Z
parsed_at: 2026-04-13T18:05:31.387Z
compiled_to: "[[Fix: Direct Import of `extract` Function in Graphify]]"
processed_at: 2026-04-13T18:11:40.368Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix: import extract function directly from graphify.extract module

- **Repo:** rahilsinghi/graphify
- **SHA:** 5d3b88f
- **Date:** 2026-04-10T23:50:11Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +2
- **Deletions:** -1

The lazy import in __init__.py returns the module object instead of the
function when both share the name "extract". Import directly to get the
callable function.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
