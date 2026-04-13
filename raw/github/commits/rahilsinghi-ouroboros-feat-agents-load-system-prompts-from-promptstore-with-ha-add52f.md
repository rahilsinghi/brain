---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:e3e7632
ingested_at: 2026-04-13T16:05:10.288Z
parsed_at: 2026-04-13T16:05:10.288Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24X1u38G6xaFRacJwSf"}
compile_progress: null
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
