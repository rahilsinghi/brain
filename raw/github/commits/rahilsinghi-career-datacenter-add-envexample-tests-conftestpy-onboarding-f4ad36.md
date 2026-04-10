---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:fbb4f33
ingested_at: 2026-04-10T03:04:49.549Z
parsed_at: 2026-04-10T03:04:49.549Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuMFRoy89pZ1q1XMuXxt"}
compile_progress: null
---



# Add .env.example + tests/conftest.py - onboarding polish

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** fbb4f33
- **Date:** 2026-02-18T23:09:33Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +86
- **Deletions:** -0

.env.example: Template for all required and optional env vars with inline
comments (where to get LinkedIn cookies, Gmail App Password, etc.). Added
!.env.example negation to .gitignore so the template can be committed.

tests/conftest.py: Adds cli/ to sys.path at pytest collection time,
removing per-file sys.path hacks from individual test files.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
