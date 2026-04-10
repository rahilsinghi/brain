---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:b73e4fa
ingested_at: 2026-04-10T09:03:48.659Z
parsed_at: 2026-04-10T09:03:48.659Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupd3VJ9N3kAZQwMTPTP"}
compile_progress: null
---



# Add JobDeduplicator unit tests - persistence, expiry, filter_new

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** b73e4fa
- **Date:** 2026-02-17T22:46:37Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +85
- **Deletions:** -0

Tests cover: is_seen() before/after marking, mark_seen_batch(), filter_new()
returning only unseen IDs, persistence across JobDeduplicator instances (reload
from disk), and TTL expiry logic (45-day-old entries pruned on load, 5-day-old
entries kept). Uses pytest fixtures with tmp_path for isolated file I/O.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
