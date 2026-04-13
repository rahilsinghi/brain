---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:7f4d82e
ingested_at: 2026-04-13T17:05:37.794Z
parsed_at: 2026-04-13T17:05:37.794Z
compiled_to: "[[GECO Loader Fix: Handling NaN Words and Numeric String Coercion]]"
processed_at: 2026-04-13T17:19:36.641Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix(data): handle NaN words and numeric string coercion in GECO loader

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 7f4d82e
- **Date:** 2026-03-27T16:09:10Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +7
- **Deletions:** -3

GECO corpus has 12 rows with NaN words and 205 numeric-looking words
(e.g., "1984") that pandas parses as floats. Added dropna for word
column and astype(str) on both xlsx processing and CSV reload paths.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
