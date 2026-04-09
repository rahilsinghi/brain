---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:fbb4f33
ingested_at: 2026-04-09T03:18:47.779Z
parsed_at: 2026-04-09T03:18:47.779Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
