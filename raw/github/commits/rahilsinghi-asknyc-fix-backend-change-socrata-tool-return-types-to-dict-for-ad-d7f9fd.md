---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:53a97e7
ingested_at: 2026-04-13T17:05:37.826Z
parsed_at: 2026-04-13T17:05:37.826Z
compiled_to: "[[Backend Fix: Socrata Tool Return Types for ADK Compatibility in askNYC]]"
processed_at: 2026-04-13T17:34:43.168Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix(backend): change Socrata tool return types to dict for ADK compatibility

- **Repo:** rahilsinghi/askNYC
- **SHA:** 53a97e7
- **Date:** 2026-03-28T02:44:39Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +18
- **Deletions:** -18

ADK automatic function calling cannot parse complex Pydantic return types
like DataCard | None. Changed all 7 tool functions to return dict | None
with .model_dump() calls.
