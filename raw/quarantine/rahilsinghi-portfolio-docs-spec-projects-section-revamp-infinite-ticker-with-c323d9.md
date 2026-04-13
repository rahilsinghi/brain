---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:701e588
ingested_at: 2026-04-13T00:04:31.069Z
parsed_at: 2026-04-13T00:04:31.069Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24pexhpfLz31T58pDtX"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:49.882Z
---






# docs(spec): projects section revamp — infinite ticker with auto-discovery

- **Repo:** rahilsinghi/portfolio
- **SHA:** 701e588
- **Date:** 2026-04-08T19:38:26Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +323
- **Deletions:** -0

Design spec for replacing FeaturedProjects + GitHubStats with a unified
auto-discovering ticker section. All repos from GitHub, optional enrichment
via overrides.ts, procedural canvas art, pure CSS infinite scroll.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
