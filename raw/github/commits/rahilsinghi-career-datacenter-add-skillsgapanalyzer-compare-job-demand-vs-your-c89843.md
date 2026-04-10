---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:1caf1d4
ingested_at: 2026-04-10T09:03:48.661Z
parsed_at: 2026-04-10T09:03:48.661Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcW4BYS6a3mC1pjGQb"}
compile_progress: null
---



# Add SkillsGapAnalyzer - compare job demand vs your skills.yaml

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 1caf1d4
- **Date:** 2026-02-17T22:41:23Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +292
- **Deletions:** -0

Reads all scraped jobs from tracking CSV, counts how frequently each skill
appears across job descriptions, and compares against data/skills.yaml to
surface gaps. Outputs ranked table with ✓/✗ coverage indicators and a
dedicated gaps section. Supports --min-score filter and --save to file.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
