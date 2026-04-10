---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:f62a5f2
ingested_at: 2026-04-09T21:03:21.273Z
parsed_at: 2026-04-09T21:03:21.273Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM37L8fWwyFr6M53Ukk"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:18.324Z
---






# Add pipeline integration tests + fix ZeroDivisionError in summary report

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** f62a5f2
- **Date:** 2026-02-18T14:58:21Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +237
- **Deletions:** -3

Integration tests cover CSV output format (required columns, value correctness,
salary fields), multi-run deduplication across simulated overnight runs,
full status lifecycle (new → applied → interview → offer with applied_at
timestamp), skills gap analysis (extract_skills, analyze output structure,
covered/gaps disjoint), and salary intelligence (percentile math, stats shape).

Bug fix: generate_summary_report() divided by zero when tracker was empty
(total=0). Now uses max(total, 1) as the percentage base.

37 tests passing.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
