---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:600aa70
ingested_at: 2026-04-10T08:03:40.115Z
parsed_at: 2026-04-10T08:03:40.115Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk3CTPQbqZiGwpHRBuN"}
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
