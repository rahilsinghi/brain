---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:8f7f5ab
ingested_at: 2026-04-13T18:05:31.324Z
parsed_at: 2026-04-13T18:05:31.324Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix(graph): expand tilde in explorer_repo_path before push

- **Repo:** rahilsinghi/brain
- **SHA:** 8f7f5ab
- **Date:** 2026-04-13T01:01:42Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +5
- **Deletions:** -1

The graph-push route passed the raw config value ~/Desktop/brain-explorer
to push.ts, which used it as both a writeFileSync path and Bun.spawnSync
cwd. Neither Node fs nor Bun expand ~ — so graph data was being written
to a literal ~/Desktop/brain-explorer directory inside the brain repo root
instead of the actual explorer repo.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
