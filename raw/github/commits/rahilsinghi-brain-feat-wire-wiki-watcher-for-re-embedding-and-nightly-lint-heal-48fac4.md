---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:ec23707
ingested_at: 2026-04-09T00:04:28.488Z
parsed_at: 2026-04-09T00:04:28.488Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# feat: wire wiki watcher for re-embedding and nightly lint/heal cron

- **Repo:** rahilsinghi/brain
- **SHA:** ec23707
- **Date:** 2026-04-04T00:19:13Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +62
- **Deletions:** -0

- startWatchers now initialises a VectorStore and chokidar wiki watcher;
  on .md change, re-embeds via syncFile if shouldReembed returns true
- close() tears down the wiki watcher alongside the raw watcher
- index.ts schedules a node-cron job on config.cron.lint_heal that takes
  a pre-heal git snapshot then runs runLintHeal with config guardrails

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
