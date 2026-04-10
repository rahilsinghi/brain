---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:5d1faeb
ingested_at: 2026-04-10T15:04:13.430Z
parsed_at: 2026-04-10T15:04:13.430Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(backend): ADK multi-agent backend with 7 NYC Open Data tools

- **Repo:** rahilsinghi/askNYC
- **SHA:** 5d1faeb
- **Date:** 2026-03-28T00:31:28Z
- **Author:** Rahil Singhi
- **Files changed:** 15
- **Additions:** +1602
- **Deletions:** -0

- FastAPI with WebSocket endpoints for dashboard and phone remote
- Gemini Live session using ADK Runner.run_live() + LiveRequestQueue
- 5 specialist sub-agents: food safety, housing, safety, construction, transit
- 7 Socrata API tools (311, restaurants, DOB, HPD, NYPD, evictions, subway)
- Google Search grounding + geocoding + map event push
- Model: gemini-3.1-flash-live-preview
