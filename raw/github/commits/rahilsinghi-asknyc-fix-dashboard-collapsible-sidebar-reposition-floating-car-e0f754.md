---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:e46df7f
ingested_at: 2026-04-10T08:03:40.139Z
parsed_at: 2026-04-10T08:03:40.139Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk3JKbyP3XgGcxGEwQj"}
compile_progress: null
---



# fix(dashboard): collapsible sidebar + reposition floating cards

- **Repo:** rahilsinghi/askNYC
- **SHA:** e46df7f
- **Date:** 2026-03-28T16:41:17Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +73
- **Deletions:** -26

Cards were hidden behind sidebar (left-4 vs 200px sidebar). Moved to
vertically centered with dynamic left offset. Sidebar now collapses
to icon-only 56px rail via chevron toggle.
