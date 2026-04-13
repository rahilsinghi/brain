---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:2b42cf1
ingested_at: 2026-04-13T18:05:31.337Z
parsed_at: 2026-04-13T18:05:31.337Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(graphify): implement SyncSource that shells out to graphify CLI

- **Repo:** rahilsinghi/brain
- **SHA:** 2b42cf1
- **Date:** 2026-04-11T00:03:45Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +111
- **Deletions:** -0

Adds src/sources/graphify.ts with createGraphifySource() factory. Walks
output directory post-CLI to collect architecture reports and file summaries
as RawDrops. Adds vitest setupFiles shim to make vi.spyOn work on the
child_process ESM namespace.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
