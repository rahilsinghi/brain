---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:d7408ec
ingested_at: 2026-04-10T08:03:40.138Z
parsed_at: 2026-04-10T08:03:40.138Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2Jo717THjWyUYKQJu"}
compile_progress: null
---



# feat(ask): add /ask recommendation page with multi-agent pipeline

- **Repo:** rahilsinghi/askNYC
- **SHA:** d7408ec
- **Date:** 2026-03-28T16:52:35Z
- **Author:** Rahil Singhi
- **Files changed:** 15
- **Additions:** +1898
- **Deletions:** -2

New text-based recommendation experience at /ask. Users ask open-ended
NYC questions, 6-8 data agents run visibly in parallel querying Socrata
datasets, and Gemini synthesizes scored recommendation cards with
data-backed reasoning.

Backend: SSE endpoint (POST /api/recommend), recommend_service.py
orchestration (parse → geocode → parallel queries → synthesize).
Frontend: AgentCard/Grid, RecommendationCard, QueryInput, ProgressTimeline,
useRecommend hook with 4 hardcoded demo fallback sequences.
