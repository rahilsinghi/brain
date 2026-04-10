---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:d0d57f2
ingested_at: 2026-04-10T09:03:48.664Z
parsed_at: 2026-04-10T09:03:48.664Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcYgSYQMSr16Nync8y"}
compile_progress: null
---



# Add LinkedIn overnight batch processing system

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** d0d57f2
- **Date:** 2026-02-14T17:02:53Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +740
- **Deletions:** -0

Built LinkedIn-focused automation for overnight job processing:

1. LinkedIn Scraper (scraper_linkedin.py):
   - Uses linkedin-api package with authentication
   - Searches recent jobs (last 24 hours)
   - Extracts Easy Apply jobs
   - Supports time filters (day, week, month)
   - Fetches full job details including description

2. Overnight Batch Processor (batch_process_overnight.py):
   - Complete end-to-end automation workflow
   - Scrapes LinkedIn jobs → filters → scores → generates applications
   - Auto-generates resume + cover letter for high-fit jobs (≥8.0)
   - Saves applications to outputs/batch_generated/YYYYMMDD/
   - Generates daily summary report
   - Cron-ready for 2am daily execution

Workflow:
- Run overnight (2am)
- Wake up to CSV with jobs + pre-generated applications
- Review and apply

Requires: LINKEDIN_EMAIL and LINKEDIN_PASSWORD in .env

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
