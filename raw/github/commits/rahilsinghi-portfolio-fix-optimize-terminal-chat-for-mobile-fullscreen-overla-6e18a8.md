---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:f6d17c1
ingested_at: 2026-04-10T10:04:00.829Z
parsed_at: 2026-04-10T10:04:00.829Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3HJLim55xePm13NK4Q"}
compile_progress: null
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
