---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:cb53520
ingested_at: 2026-04-09T05:03:49.973Z
parsed_at: 2026-04-09T05:03:49.973Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# chore: simplify frontend HTTPS — drop explicit cert paths

- **Repo:** rahilsinghi/raag
- **SHA:** cb53520
- **Date:** 2026-03-06T22:38:50Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +1
- **Deletions:** -1

Let Next.js use its built-in self-signed cert instead of custom
mkcert paths, reducing config friction on fresh clones.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
