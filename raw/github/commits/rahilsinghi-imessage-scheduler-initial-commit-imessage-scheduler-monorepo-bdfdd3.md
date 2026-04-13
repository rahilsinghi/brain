---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/imessage-scheduler:2f645bc
ingested_at: 2026-04-13T17:05:37.841Z
parsed_at: 2026-04-13T17:05:37.841Z
compiled_to: "[[iMessage Scheduler Monorepo Initial Commit]]"
processed_at: 2026-04-13T17:36:49.821Z
retry_count: 0
last_error: null
compile_progress: null
---



# Initial commit: iMessage scheduler monorepo

- **Repo:** rahilsinghi/imessage-scheduler
- **SHA:** 2f645bc
- **Date:** 2026-03-10T17:58:11Z
- **Author:** Rahil Singhi
- **Files changed:** 41
- **Additions:** +6260
- **Deletions:** -0

Three-package monorepo: React frontend, Express backend with FIFO queue, and macOS iMessage gateway via AppleScript.

- Frontend: React 19 + TypeScript + Vite + Tailwind v4
- Backend: Express + Drizzle ORM + SQLite + queue worker
- Gateway: AppleScript bridge for Messages.app delivery
- Dashboard with stats and configurable send interval
