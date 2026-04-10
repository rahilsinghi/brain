---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:9a0d81a
ingested_at: 2026-04-10T12:03:43.550Z
parsed_at: 2026-04-10T12:03:43.550Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4KzHidk8ECmPB7HWrh"}
compile_progress: null
---



# fix: correct GECO data parser for real corpus format

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 9a0d81a
- **Date:** 2026-03-15T23:36:36Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +13
- **Deletions:** -3

- WORD_ID format is PART-TRIAL-WORDPOS (e.g., "1-5-3"), not "w1.1"
- sentence_id computed as PART * 10000 + TRIAL composite key
- Handle "." sentinel values in fixation columns via pd.to_numeric
- Filter rows where WORD_ID doesn't match expected regex pattern
