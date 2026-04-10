---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:939ca78
ingested_at: 2026-04-09T22:03:19.480Z
parsed_at: 2026-04-09T22:03:19.480Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3y6KDCh3g6x4q3ZRu"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:29.959Z
---






# chore: add pretext submodule and @chenglou/pretext dependency

- **Repo:** rahilsinghi/portfolio
- **SHA:** 939ca78
- **Date:** 2026-03-31T22:29:37Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +14
- **Deletions:** -1

Adds forked pretext repo as git submodule for reference demos.
Installs @chenglou/pretext@0.0.3 for text measurement/layout.
Excludes submodule from TypeScript compilation.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
