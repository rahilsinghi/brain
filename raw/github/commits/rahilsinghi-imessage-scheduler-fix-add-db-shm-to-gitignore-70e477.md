---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/imessage-scheduler:b571b2c
ingested_at: 2026-04-09T05:03:49.986Z
parsed_at: 2026-04-09T05:03:49.986Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
