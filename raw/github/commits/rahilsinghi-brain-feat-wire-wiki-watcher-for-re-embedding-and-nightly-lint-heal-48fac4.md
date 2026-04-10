---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:ec23707
ingested_at: 2026-04-10T06:04:07.631Z
parsed_at: 2026-04-10T06:04:07.631Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuavEn3QiNE2QbqhkvGv"}
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
