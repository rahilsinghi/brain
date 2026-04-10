---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:884cdb0
ingested_at: 2026-04-09T21:03:21.277Z
parsed_at: 2026-04-09T21:03:21.277Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3B7LhSRsE283n2Nht"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:19.203Z
---






# Add JobDeduplicator - persist seen job IDs across nightly runs

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 884cdb0
- **Date:** 2026-02-17T19:49:55Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +104
- **Deletions:** -3

- New cli/job_deduplicator.py: tracks job_ids in tracking/seen_jobs.json
- Auto-expires entries after 30 days (configurable)
- filter_new(), mark_seen_batch(), is_seen() API
- Integrated into OvernightBatchProcessor._scrape_linkedin_jobs()
- Skips already-seen jobs on each run, logs duplicate count
- tracking/seen_jobs.json added to .gitignore below

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
