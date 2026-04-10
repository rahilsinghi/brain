---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:600aa70
ingested_at: 2026-04-10T15:04:13.381Z
parsed_at: 2026-04-10T15:04:13.381Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(output): add Marp slide generation with error handling and cleanup

- **Repo:** rahilsinghi/brain
- **SHA:** 600aa70
- **Date:** 2026-04-09T00:57:55Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +199
- **Deletions:** -0

Implements generateSlides() — queries wiki via synthesizeFn, prompts Claude
for Marp markdown, writes to output/slides/{slug}.md, shells out to marp-cli
for PDF/HTML rendering, and cleans up partial files on failure.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
