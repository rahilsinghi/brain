---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:b07cd80
ingested_at: 2026-04-10T12:03:43.550Z
parsed_at: 2026-04-10T12:03:43.550Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4L1G1UFgB7SMivWjcF"}
compile_progress: null
---



# test: strengthen AR baseline tests from 3 to 10

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** b07cd80
- **Date:** 2026-03-15T23:37:03Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +132
- **Deletions:** -1

- Config validation: negative top_k, zero max_new_tokens
- Lambda semantics: lam=0 means unguided
- Temperature defaults and custom gaze_temperature
- generate_ar_samples result format with mocked generation
- Multi-prompt batch: 3 prompts x 3 samples = 9 results
