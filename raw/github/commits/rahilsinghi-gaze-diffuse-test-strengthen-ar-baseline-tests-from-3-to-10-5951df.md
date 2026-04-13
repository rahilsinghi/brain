---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:b07cd80
ingested_at: 2026-04-13T17:05:37.796Z
parsed_at: 2026-04-13T17:05:37.796Z
compiled_to: "[[Strengthening AR Baseline Tests in Gaze-Diffuse]]"
processed_at: 2026-04-13T17:07:55.103Z
retry_count: 0
last_error: null
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
