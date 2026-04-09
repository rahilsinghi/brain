---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:e12e851
ingested_at: 2026-04-09T01:03:46.914Z
parsed_at: 2026-04-09T01:03:46.914Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
