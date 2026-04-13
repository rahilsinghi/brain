---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:dca3fb5
ingested_at: 2026-04-12T23:04:19.862Z
parsed_at: 2026-04-12T23:04:19.862Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24k3Z7RcLgFjk4rGwnj"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:47.240Z
---






# docs: escalation ladder v2 design spec and updated project docs

- **Repo:** rahilsinghi/karen
- **SHA:** dca3fb5
- **Date:** 2026-04-04T14:22:28Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +458
- **Deletions:** -57

New 10-level ladder: unique channel per level, no repeats.
Removed LinkedIn (stub) and Twitter (broken 402).
Added: OSINT research (L4), Slack (L6), real Calendar (L9),
FedEx rate quotes (L10). Updated CLAUDE.md ladder section,
env vars, accounts table, and de-escalation sequence.
