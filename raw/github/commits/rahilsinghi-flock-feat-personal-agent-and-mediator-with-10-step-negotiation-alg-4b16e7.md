---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Flock:c13fee4
ingested_at: 2026-04-13T16:05:10.308Z
parsed_at: 2026-04-13T16:05:10.308Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24Nb4KpBDRroqyY7yUN"}
compile_progress: null
---



# feat: personal agent and mediator with 10-step negotiation algorithm

- **Repo:** rahilsinghi/Flock
- **SHA:** c13fee4
- **Date:** 2026-03-21T14:23:30Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +618
- **Deletions:** -0

personal-agent.ts — streamText with Gemini 2.5 Flash, round-aware
system prompt, tools for destination eval + hotel matching + public
proposals. Updates agent_status via Supabase on finish.

mediator-agent.ts — 10-step algorithm: constraint intersection,
aesthetic city ranking, per-user evaluation, hard constraint check,
compromise negotiation, hotel selection, trip scoring. Posts MEDIATOR
proposals to Why Wall, writes final TripDecision, manages tension_score.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
