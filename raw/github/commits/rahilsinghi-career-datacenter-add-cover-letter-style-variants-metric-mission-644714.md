---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:f4fe985
ingested_at: 2026-04-13T18:05:31.405Z
parsed_at: 2026-04-13T18:05:31.405Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Add cover letter style variants - metric, mission, and story-focused hooks

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** f4fe985
- **Date:** 2026-02-17T22:45:44Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +69
- **Deletions:** -4

Adds cover_letter.style config to scraper_config.yaml with three hook styles:
metric_focused (default), mission_focused, and story_focused. CoverLetterGenerator
reads style from config or COVER_LETTER_STYLE env var, then injects a
style-specific instruction into the LLM system prompt at generation time.
No breaking changes - existing callers get metric_focused by default.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
