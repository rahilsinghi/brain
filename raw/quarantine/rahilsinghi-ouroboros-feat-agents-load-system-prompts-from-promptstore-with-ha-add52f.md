---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:e3e7632
ingested_at: 2026-04-10T01:03:40.354Z
parsed_at: 2026-04-10T01:03:40.354Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM3KU8wrP1v9K3SzFNy"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:21.160Z
---






# feat(agents): load system prompts from PromptStore with hardcoded fallback

- **Repo:** rahilsinghi/ouroboros
- **SHA:** e3e7632
- **Date:** 2026-04-04T00:06:22Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +29
- **Deletions:** -11

Wire PromptStore into ImprovementLoop.__init__ and add optional system_prompt
param to ObserverAgent, StrategistAgent, and ImplementerAgent so prompts can
be overridden at runtime via .ouroboros/prompts/ files.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
