---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:01c72dc
ingested_at: 2026-04-13T00:04:31.093Z
parsed_at: 2026-04-13T00:04:31.093Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24cSQ4kare9dkT4DCJw"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:04.120Z
---






# Add weekly_report.py - auto-generated job search summary report

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 01c72dc
- **Date:** 2026-02-17T22:43:53Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +320
- **Deletions:** -0

Produces a detailed markdown report covering the last N days: jobs scraped,
high-fit count, applications generated/submitted, fit score distribution,
daily activity breakdown, top 5 opportunities, source breakdown, and top
companies. Saves to outputs/weekly_reports/week_YYYYMMDD.md. Run with --print
for a quick terminal summary.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
