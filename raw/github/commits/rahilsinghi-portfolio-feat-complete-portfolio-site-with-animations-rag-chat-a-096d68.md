---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:b9be641
ingested_at: 2026-04-09T06:03:35.979Z
parsed_at: 2026-04-09T06:03:35.979Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
