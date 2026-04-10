---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:f6d17c1
ingested_at: 2026-04-09T23:03:16.556Z
parsed_at: 2026-04-09T23:03:16.556Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3dTcSC6HhRTJNn4Uc"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:25.372Z
---






# fix: optimize terminal chat for mobile — fullscreen overlay with backdrop

- **Repo:** rahilsinghi/portfolio
- **SHA:** f6d17c1
- **Date:** 2026-03-12T00:28:58Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +12
- **Deletions:** -5

Mobile: fills viewport with dark backdrop, larger touch targets and text.
Desktop: unchanged bottom-right positioning. Smooth open/close without
disturbing page content behind.
