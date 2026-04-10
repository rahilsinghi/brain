---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:02c6049
ingested_at: 2026-04-10T02:04:52.501Z
parsed_at: 2026-04-10T02:04:52.501Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM679YyRpApXnjj7Mb4"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:59.017Z
---






# fix: merge model update to gemini-2.5-flash-native-audio-latest (#2)

- **Repo:** rahilsinghi/askNYC
- **SHA:** 02c6049
- **Date:** 2026-03-28T03:09:22Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +7
- **Deletions:** -5

Chinmay tested all available models — gemini-2.5-flash-native-audio-latest
is the only stable live audio model. gemini-3.1-flash-live-preview fails
with internal errors.
