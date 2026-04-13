---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:d7408ec
ingested_at: 2026-04-13T17:05:37.819Z
parsed_at: 2026-04-13T17:05:37.819Z
compiled_to: "[[AskNYC Recommendation Page with Multi-Agent Pipeline]]"
processed_at: 2026-04-13T17:07:01.596Z
retry_count: 0
last_error: null
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
