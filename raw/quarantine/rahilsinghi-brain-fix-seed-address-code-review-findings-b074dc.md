---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:77d700a
ingested_at: 2026-04-13T16:05:10.263Z
parsed_at: 2026-04-13T16:05:10.263Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24gtNdTuPvenXJFisuz"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:04.415Z
---






# fix(seed): address code review findings

- **Repo:** rahilsinghi/brain
- **SHA:** 77d700a
- **Date:** 2026-04-08T12:53:16Z
- **Author:** Rahil Singhi
- **Files changed:** 5
- **Additions:** +13
- **Deletions:** -13

- Stories: use *** instead of --- for section separators (avoids frontmatter confusion)
- Projects: add explicit parens in metricAlreadyInText for operator precedence clarity
- Runner: move YAML import to top-level, fix --only tracking routing logic
- Unstructured: use file_drop source_type for markdown docs, add --force skip logic

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
