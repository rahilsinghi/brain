---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:5d9ae01
ingested_at: 2026-04-13T16:05:10.307Z
parsed_at: 2026-04-13T16:05:10.307Z
compiled_to: "[[Flock: Remove @clerk/nextjs Dependency and Implement Dynamic Agent Labels]]"
processed_at: 2026-04-13T16:06:02.719Z
retry_count: 0
last_error: null
compile_progress: null
---



# chore: remove @clerk/nextjs dep, make agent labels dynamic

- **Repo:** rahilsinghi/Flock
- **SHA:** 5d9ae01
- **Date:** 2026-03-21T15:15:45Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +4
- **Deletions:** -158

Remove unused Clerk dependency from package.json.
Replace hardcoded AGENT_NAMES map with agentLabel(displayName)
function so labels work for any participant, not just demo profiles.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
