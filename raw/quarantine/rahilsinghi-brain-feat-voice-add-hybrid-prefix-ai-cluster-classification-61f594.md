---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:1ac80b0
ingested_at: 2026-04-10T02:04:52.479Z
parsed_at: 2026-04-10T02:04:52.479Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2wVYQMibQxzfxzadp"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:16.054Z
---






# feat(voice): add hybrid prefix/AI cluster classification

- **Repo:** rahilsinghi/brain
- **SHA:** 1ac80b0
- **Date:** 2026-04-09T00:45:48Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +178
- **Deletions:** -0

Implements detectPrefix() for keyword-based routing and classifyCluster()
with Claude Haiku fallback, covering error and invalid-response edge cases.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
