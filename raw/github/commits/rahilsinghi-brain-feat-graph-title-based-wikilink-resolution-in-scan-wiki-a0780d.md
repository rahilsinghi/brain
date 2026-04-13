---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:9e54274
ingested_at: 2026-04-13T18:05:31.352Z
parsed_at: 2026-04-13T18:05:31.352Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(graph): title-based wikilink resolution in scan-wiki

- **Repo:** rahilsinghi/brain
- **SHA:** 9e54274
- **Date:** 2026-04-10T22:58:30Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +69
- **Deletions:** -5

Add titleToId and slugToId maps for case-insensitive title resolution.
Resolution chain: exact path → filename → title → slug → drop.
Handles duplicate titles via first-match-wins.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
