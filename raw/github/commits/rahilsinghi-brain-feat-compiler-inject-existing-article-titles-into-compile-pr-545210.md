---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:ab998ec
ingested_at: 2026-04-13T18:05:31.350Z
parsed_at: 2026-04-13T18:05:31.350Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(compiler): inject existing article titles into compile prompt

- **Repo:** rahilsinghi/brain
- **SHA:** ab998ec
- **Date:** 2026-04-10T22:59:07Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +123
- **Deletions:** -4

Adds getExistingTitles() with 5-min TTL cache that walks wiki/ and
extracts frontmatter titles (capped at 500). LLM can now link to real
articles instead of hallucinating topic names.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
