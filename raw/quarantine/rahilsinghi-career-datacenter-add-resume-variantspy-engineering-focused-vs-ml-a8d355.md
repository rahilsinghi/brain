---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:0f1d9d4
ingested_at: 2026-04-09T21:03:21.274Z
parsed_at: 2026-04-09T21:03:21.274Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM576Yq89i2odX3Z3iM"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:45.412Z
---






# Add resume_variants.py - engineering-focused vs ML-focused resume variants

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 0f1d9d4
- **Date:** 2026-02-17T22:44:36Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +244
- **Deletions:** -0

Generates two tailored resume PDFs per job: v1 emphasizes systems engineering,
APIs, scale, and production deployments; v2 emphasizes ML models, experiments,
data pipelines, and measurable ML impact. Uses the same JDParser + FitScorer
pipeline, then re-prompts ResumeGenerator with variant-specific emphasis
instructions. Records variant used in applications.csv notes column.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
