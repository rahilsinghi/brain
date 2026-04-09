---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:c9569d8
ingested_at: 2026-04-09T04:03:38.396Z
parsed_at: 2026-04-09T04:03:38.396Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Fix knowledge base loader to use correct YAML keys

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** c9569d8
- **Date:** 2026-02-14T16:20:51Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +2
- **Deletions:** -2

Changed education and experience loaders to use "entries" key instead
of "education" and "experiences" to match the actual YAML file structure.

Before: load_education() returned empty list
After: Correctly loads education entries from education.yaml

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
