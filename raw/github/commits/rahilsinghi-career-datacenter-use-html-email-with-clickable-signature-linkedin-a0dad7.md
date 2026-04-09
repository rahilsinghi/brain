---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:7fc44cf
ingested_at: 2026-04-09T03:18:47.776Z
parsed_at: 2026-04-09T03:18:47.776Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
