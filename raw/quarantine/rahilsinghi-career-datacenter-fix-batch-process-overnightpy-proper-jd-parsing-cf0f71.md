---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:b9a5d8d
ingested_at: 2026-04-13T00:04:31.097Z
parsed_at: 2026-04-13T00:04:31.097Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24fKq1tnBLZnHWGWvw4"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:43.223Z
---






# Fix batch_process_overnight.py - proper JD parsing + CLI flags

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** b9a5d8d
- **Date:** 2026-02-17T19:49:20Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +45
- **Deletions:** -29

- Fix SyntaxWarning: escape %% in cron example docstring
- Fix _score_jobs(): use actual job.description via JDParser instead
  of fake_jd_text hack; use correct fit_scorer.score() method name
- Fix _generate_applications(): same - build real JD text from
  job fields and full description
- Add CLI flags: --auto-approve, --min-score, --dry-run
- OvernightBatchProcessor now accepts config params in __init__
- Dry-run mode skips application generation but still scrapes/scores

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
