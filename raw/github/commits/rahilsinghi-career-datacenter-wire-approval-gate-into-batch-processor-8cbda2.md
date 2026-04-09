---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:690a2f4
ingested_at: 2026-04-09T04:03:38.387Z
parsed_at: 2026-04-09T04:03:38.387Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Wire approval gate into batch processor

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 690a2f4
- **Date:** 2026-02-17T19:51:16Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +35
- **Deletions:** -3

- Default mode: only generate applications for jobs approved in review CLI
  (reads tracking/reviewed_jobs.json for approved job_ids)
- --auto-approve flag: generate for all high-fit jobs (unattended overnight use)
- --dry-run: scrape+score only, no generation, logs count
- Add _get_approved_jobs() helper method
- Add tracking/seen_jobs.json and reviewed_jobs.json to .gitignore

Workflow:
  1. Run batch processor (scrapes + scores)
  2. Run job_review_cli.py (approve/skip/reject)
  3. Re-run with --auto-approve OR jobs auto-generated on next run

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
