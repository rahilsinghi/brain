---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/gaze-diffuse:7b36d65
ingested_at: 2026-04-10T01:03:40.343Z
parsed_at: 2026-04-10T01:03:40.343Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5h9B99nmanpFSKsbX"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:53.384Z
---






# fix(ar-baseline): add MPS device support and GPT-2 pad token

- **Repo:** rahilsinghi/gaze-diffuse
- **SHA:** 7b36d65
- **Date:** 2026-03-27T16:09:27Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +8
- **Deletions:** -1

- Added MPS fallback for Apple Silicon local runs
- Set pad_token = eos_token for GPT-2 (has no pad token by default),
  fixing ValueError in score_vocabulary during guided generation

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
