---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:c78b054
ingested_at: 2026-04-13T18:05:31.372Z
parsed_at: 2026-04-13T18:05:31.372Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# refactor: extract ingestContent() into src/api/ingest-core.ts

- **Repo:** rahilsinghi/brain
- **SHA:** c78b054
- **Date:** 2026-04-08T18:26:35Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +142
- **Deletions:** -41

Shared function for writing raw articles with frontmatter. HTTP route
becomes thin wrapper. Enables Telegram bot to call same logic directly.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
