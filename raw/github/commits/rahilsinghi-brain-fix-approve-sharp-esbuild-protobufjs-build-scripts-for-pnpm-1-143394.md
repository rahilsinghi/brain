---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:e939983
ingested_at: 2026-04-13T18:05:31.374Z
parsed_at: 2026-04-13T18:05:31.374Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# fix: approve sharp/esbuild/protobufjs build scripts for pnpm 10

- **Repo:** rahilsinghi/brain
- **SHA:** e939983
- **Date:** 2026-04-08T15:25:34Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +7
- **Deletions:** -0

pnpm 10 blocks native module build scripts by default. Without this,
sharp fails to load and embedding sync breaks.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
