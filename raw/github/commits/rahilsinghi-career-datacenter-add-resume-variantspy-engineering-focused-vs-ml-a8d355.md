---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:0f1d9d4
ingested_at: 2026-04-09T03:18:47.781Z
parsed_at: 2026-04-09T03:18:47.781Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
