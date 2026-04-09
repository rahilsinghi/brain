---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:77d700a
ingested_at: 2026-04-09T06:03:35.985Z
parsed_at: 2026-04-09T06:03:35.985Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
