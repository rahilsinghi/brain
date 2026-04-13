---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:c944d36
ingested_at: 2026-04-13T16:05:10.299Z
parsed_at: 2026-04-13T16:05:10.299Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24XH5MBLeBgffeEhfAP"}
compile_progress: null
---



# feat: unknown names get cloned pre-built profiles with random assignment

- **Repo:** rahilsinghi/Flock
- **SHA:** c944d36
- **Date:** 2026-03-21T18:34:47Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +81
- **Deletions:** -47

When an unknown name logs in:
1. Picks a random profile from the pool (10 pre-built profiles)
2. Clones context_md + aesthetic embedding into a new user
3. Updates display_name to what the user typed
4. Result: "Mike" gets a rich pre-filled travel fingerprint

Known names (Rahil, Aayush, Thor, etc.) map to their specific profiles.
Aish/Aishwarya aliased to judge_akriti.

This ensures every judge gets an interesting profile for the demo,
regardless of whether their name was pre-seeded.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
