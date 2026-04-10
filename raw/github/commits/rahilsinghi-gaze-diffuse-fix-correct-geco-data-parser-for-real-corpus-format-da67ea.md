---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:9a0d81a
ingested_at: 2026-04-10T01:03:40.348Z
parsed_at: 2026-04-10T01:03:40.348Z
compiled_to: "[[Fix: Correct GECO Data Parser for Real Corpus Format]]"
processed_at: 2026-04-10T02:09:19.443Z
retry_count: 0
last_error: null
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
