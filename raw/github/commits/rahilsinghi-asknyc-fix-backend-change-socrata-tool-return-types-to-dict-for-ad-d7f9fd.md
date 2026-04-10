---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:53a97e7
ingested_at: 2026-04-10T08:03:40.143Z
parsed_at: 2026-04-10T08:03:40.143Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2yV2hURHPgMzdv2wX"}
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
