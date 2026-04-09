---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:65eee64
ingested_at: 2026-04-09T04:03:38.425Z
parsed_at: 2026-04-09T04:03:38.425Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: cookie-based auth with name + room code login

- **Repo:** rahilsinghi/Flock
- **SHA:** 65eee64
- **Date:** 2026-03-21T14:57:27Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +262
- **Deletions:** -19

Replace Clerk with simple cookie auth for demo. Login flow:
name field + room code (as password) → validates session exists →
finds or creates user profile → sets httpOnly cookie → redirect.

Middleware redirects unauthenticated users to login, allows API
routes and host view without auth.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
