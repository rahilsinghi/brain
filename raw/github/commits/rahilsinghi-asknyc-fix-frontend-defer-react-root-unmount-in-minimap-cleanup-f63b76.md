---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:e12e851
ingested_at: 2026-04-10T08:03:40.139Z
parsed_at: 2026-04-10T08:03:40.139Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk3Gn5sSVWGpTDfNsmL"}
compile_progress: null
---



# fix(frontend): defer React root unmount in MiniMap cleanup

- **Repo:** rahilsinghi/askNYC
- **SHA:** e12e851
- **Date:** 2026-03-28T15:05:10Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +3
- **Deletions:** -2

root.unmount() was called synchronously in the useEffect cleanup,
which races with React's render cycle. Deferring via setTimeout(0)
avoids the "unmount while rendering" warning.
