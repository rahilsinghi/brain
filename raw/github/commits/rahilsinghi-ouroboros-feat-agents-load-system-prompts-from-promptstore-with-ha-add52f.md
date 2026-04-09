---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:e3e7632
ingested_at: 2026-04-09T00:04:28.493Z
parsed_at: 2026-04-09T00:04:28.493Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
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
