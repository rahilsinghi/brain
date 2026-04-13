---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:b43f36f
ingested_at: 2026-04-13T18:05:31.367Z
parsed_at: 2026-04-13T18:05:31.367Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(vector-store): add listAll() for bulk embedding retrieval

- **Repo:** rahilsinghi/brain
- **SHA:** b43f36f
- **Date:** 2026-04-10T16:16:30Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +17
- **Deletions:** -0

- Returns all chunks from LanceDB including their vector fields
- Converts Float32Array to number[] via Array.from()
- Complements search() which strips vectors from results

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
