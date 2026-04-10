---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/imessage-scheduler:b571b2c
ingested_at: 2026-04-09T23:03:16.571Z
parsed_at: 2026-04-09T23:03:16.571Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5pbtimRwXYrkhbWha"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:55.109Z
---






# fix: add *.db-shm to .gitignore

- **Repo:** rahilsinghi/imessage-scheduler
- **SHA:** b571b2c
- **Date:** 2026-03-10T18:12:01Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +1
- **Deletions:** -0

SQLite WAL shared memory files were not being ignored, causing
untracked file warnings after running the backend.
