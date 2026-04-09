---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:02bc805
ingested_at: 2026-04-09T01:03:46.912Z
parsed_at: 2026-04-09T01:03:46.912Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# fix(recommend): enforce 3-4 distinct recommendations per query

- **Repo:** rahilsinghi/askNYC
- **SHA:** 02bc805
- **Date:** 2026-03-28T19:09:58Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +11
- **Deletions:** -4

Update synthesis prompt to require exactly 3-4 named places with
varied scores and different data highlights per recommendation.
