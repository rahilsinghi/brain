---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/imessage-scheduler:2f645bc
ingested_at: 2026-04-10T06:04:07.637Z
parsed_at: 2026-04-10T06:04:07.637Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuavdEA3EiGnjB3S7uPG"}
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
