---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:e0eaad2
ingested_at: 2026-04-09T04:03:38.386Z
parsed_at: 2026-04-09T04:03:38.386Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Add FastAPI web dashboard (overview, jobs table, applications, analytics)

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** e0eaad2
- **Date:** 2026-02-17T21:57:30Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +675
- **Deletions:** -26

New cli/dashboard.py (FastAPI + uvicorn):
- / : Pipeline overview with stat cards + top high-fit jobs
- /jobs : Sortable jobs table with search/filter (score, status, keyword)
- /jobs/{id} : Job detail page with description, metadata, approve/reject buttons
- /applications : Kanban-style pipeline (Preparing → Applied → Interview → Offer)
- /analytics : Skill demand bar charts, fit score distribution, salary stats, source breakdown
- POST /jobs/{id}/action : Approve/reject/skip inline actions (updates reviewed_jobs.json + CSV)
- Dark theme, color-coded fit scores, Bootstrap-free pure CSS
- Auto-opens browser on launch; --no-browser flag for headless use
- --port and --host flags

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
