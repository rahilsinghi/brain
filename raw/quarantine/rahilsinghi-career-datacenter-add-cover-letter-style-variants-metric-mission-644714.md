---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:f4fe985
ingested_at: 2026-04-13T00:04:31.093Z
parsed_at: 2026-04-13T00:04:31.093Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24nQjPRZZNNjmQpoQmJ"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:19.359Z
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
