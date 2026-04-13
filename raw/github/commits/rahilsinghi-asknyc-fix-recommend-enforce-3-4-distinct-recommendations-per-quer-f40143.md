---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:02bc805
ingested_at: 2026-04-13T17:05:37.815Z
parsed_at: 2026-04-13T17:05:37.815Z
compiled_to: "[[Enforce Distinct Recommendations in askNYC Synthesis Prompt]]"
processed_at: 2026-04-13T17:21:17.165Z
retry_count: 0
last_error: null
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
