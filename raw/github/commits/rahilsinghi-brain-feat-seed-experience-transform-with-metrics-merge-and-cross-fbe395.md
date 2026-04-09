---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:4985d52
ingested_at: 2026-04-09T00:04:28.476Z
parsed_at: 2026-04-09T00:04:28.476Z
compiled_to: "[[Experience Transform: Metrics Merge and Cross-Referencing]]"
processed_at: 2026-04-09T02:05:43.188Z
retry_count: 0
last_error: null
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
