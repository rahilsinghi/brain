---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:e9902d7
ingested_at: 2026-04-09T21:03:21.275Z
parsed_at: 2026-04-09T21:03:21.275Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4QPamEkHgo6QPFHaf"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:35.878Z
---






# Add ApplicationBatchRunner - generates full application packs in batch

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** e9902d7
- **Date:** 2026-02-17T22:37:56Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +263
- **Deletions:** -0

New cli/application_runner.py:
- ApplicationBatchRunner: parse JD → score fit → resume → cover letter → PDFs
- run_for_approved(): reads reviewed_jobs.json, generates for approved jobs
- run_for_job_id(id): single-job generation
- run_for_min_score(n): generate for all jobs above score threshold
- Saves to outputs/batch_generated/YYYYMMDD/{company}_{id}/
- Records each application in tracking/applications.csv
- Error isolation: one failure doesn't stop the rest

cli/job_tracker.py:
- Add public load_all_jobs() alias for _load_all_jobs()

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
