---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:d7408ec
ingested_at: 2026-04-10T02:04:52.498Z
parsed_at: 2026-04-10T02:04:52.498Z
compiled_to: "[[askNYC /ask Recommendation Page with Multi-Agent Pipeline]]"
processed_at: 2026-04-10T02:06:10.275Z
retry_count: 1
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuGit1yXSBkGkdqmbNiN\"}"
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
