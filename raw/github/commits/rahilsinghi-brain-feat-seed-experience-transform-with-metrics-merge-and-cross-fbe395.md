---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:4985d52
ingested_at: 2026-04-10T06:04:07.626Z
parsed_at: 2026-04-10T06:04:07.626Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuauYW7ddw9PmwJsN3T4"}
compile_progress: null
---



# feat(seed): experience transform with metrics merge and cross-referencing

- **Repo:** rahilsinghi/brain
- **SHA:** 4985d52
- **Date:** 2026-04-08T12:30:03Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +186
- **Deletions:** -0

Maps ExperienceEntry YAML to wiki articles under wiki/experience/. Merges
MetricEntry data inline, skipping metrics already present in bullet text,
and emits [[ref:]] links to sibling entries at the same company.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
