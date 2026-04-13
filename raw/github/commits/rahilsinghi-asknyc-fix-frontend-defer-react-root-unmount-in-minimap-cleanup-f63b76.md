---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:e12e851
ingested_at: 2026-04-13T17:05:37.820Z
parsed_at: 2026-04-13T17:05:37.820Z
compiled_to: "[[Fix: Deferring React Root Unmount in MiniMap Cleanup for askNYC]]"
processed_at: 2026-04-13T17:43:24.475Z
retry_count: 0
last_error: null
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
