---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:53a97e7
ingested_at: 2026-04-09T03:18:47.662Z
parsed_at: 2026-04-09T03:18:47.662Z
compiled_to: null
processed_at: null
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
