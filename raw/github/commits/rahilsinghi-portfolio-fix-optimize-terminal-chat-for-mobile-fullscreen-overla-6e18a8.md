---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:f6d17c1
ingested_at: 2026-04-09T06:03:35.973Z
parsed_at: 2026-04-09T06:03:35.973Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
