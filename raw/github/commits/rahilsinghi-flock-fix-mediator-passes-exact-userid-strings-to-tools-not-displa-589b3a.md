---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:b76e9c0
ingested_at: 2026-04-09T04:03:38.417Z
parsed_at: 2026-04-09T04:03:38.417Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix: mediator passes exact userId strings to tools, not display names

- **Repo:** rahilsinghi/Flock
- **SHA:** b76e9c0
- **Date:** 2026-03-21T19:00:19Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +6
- **Deletions:** -2

The mediator was calling check_constraints with "rahil" instead of
"demo_rahil", causing "Participant not found" errors. Now the user
message explicitly tells the model to use the exact userId string
for all tool calls.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
