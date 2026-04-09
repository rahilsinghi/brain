---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:1caf1d4
ingested_at: 2026-04-09T03:18:47.782Z
parsed_at: 2026-04-09T03:18:47.782Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
