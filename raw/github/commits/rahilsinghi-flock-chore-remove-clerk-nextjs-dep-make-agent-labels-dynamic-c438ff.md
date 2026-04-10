---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:5d9ae01
ingested_at: 2026-04-10T10:04:00.839Z
parsed_at: 2026-04-10T10:04:00.839Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3GFGtpDcpgQ6da9JNk"}
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
