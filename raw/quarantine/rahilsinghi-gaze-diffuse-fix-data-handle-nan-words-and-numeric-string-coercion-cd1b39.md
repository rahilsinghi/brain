---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:7f4d82e
ingested_at: 2026-04-10T01:03:40.344Z
parsed_at: 2026-04-10T01:03:40.344Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3AGF1vUk9yJCyxScs"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:19.008Z
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
