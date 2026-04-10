---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:7fc44cf
ingested_at: 2026-04-09T21:03:21.258Z
parsed_at: 2026-04-09T21:03:21.258Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5UNEBb9Uq657HcC3i"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:50.375Z
---






# Use HTML email with clickable signature (LinkedIn | GitHub | Resume)

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 7fc44cf
- **Date:** 2026-03-04T22:03:23Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +56
- **Deletions:** -13

- Switch from plain text to multipart/alternative (HTML + plain fallback)
- HTML signature matches Gmail signature: name, phone, LinkedIn/GitHub/Resume links
- RESUME_URL placeholder at top of file — update when you have a hosted link
- Signature appended in create_draft(), not in body builders (single source of truth)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
