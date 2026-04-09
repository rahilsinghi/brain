---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:884cdb0
ingested_at: 2026-04-09T04:03:38.388Z
parsed_at: 2026-04-09T04:03:38.388Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
