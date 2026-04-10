---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:71bc9fc
ingested_at: 2026-04-09T21:03:21.277Z
parsed_at: 2026-04-09T21:03:21.277Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4Z2FGKHTB6mW1t8Vk"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:37.896Z
---






# Add job_review_cli.py - interactive terminal job review tool

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 71bc9fc
- **Date:** 2026-02-17T19:50:41Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +232
- **Deletions:** -0

- Lists today's high-fit jobs (≥8.0) from scraped_jobs.csv
- Per-job card shows: title, company, score, location, salary, URL, description snippet
- Actions: [a]pprove / [s]kip / [r]eject / [q]uit
- Saves decisions to tracking/reviewed_jobs.json with timestamps
- Rejected jobs auto-updated to 'rejected' status in tracker CSV
- --min-score flag to control threshold
- --all flag to re-review already-reviewed jobs
- --approved flag to list all approved jobs
- Color-coded output: green ≥9.0, yellow ≥8.0

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
