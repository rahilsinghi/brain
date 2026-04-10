---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:b9be641
ingested_at: 2026-04-10T00:03:23.753Z
parsed_at: 2026-04-10T00:03:23.753Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4f29o6Nh4HuSUF34e"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:39.322Z
---






# feat: complete portfolio site with animations, RAG chat, and visual upgrades

- **Repo:** rahilsinghi/portfolio
- **SHA:** b9be641
- **Date:** 2026-03-11T22:31:48Z
- **Author:** Rahil Singhi
- **Files changed:** 34
- **Additions:** +3600
- **Deletions:** -84

- Editorial brutalist design: black bg, green accents, Outfit + JetBrains Mono
- Interactive D3.js knowledge graph (canvas-rendered, 40+ skill nodes)
- Terminal chat with Gemini embeddings RAG + Gemini Flash answer generation
- Scroll-triggered animations (ScrollReveal system, 6 animation types)
- Text scramble decode effect on section headers
- Persistent bottom marquee ticker of skills/keywords
- Cursor glow follow effect (desktop only)
- Mobile hamburger nav with full-screen overlay
- Scroll progress bar
- LinkedIn posts section
- Content architecture: all text in /src/content/*.ts
- Rate-limited /api/chat with semantic search + LLM generation
