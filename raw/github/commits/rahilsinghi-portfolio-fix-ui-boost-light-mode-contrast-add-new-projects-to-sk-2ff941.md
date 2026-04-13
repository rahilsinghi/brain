---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/portfolio:ca944fc
ingested_at: 2026-04-13T17:05:37.802Z
parsed_at: 2026-04-13T17:05:37.802Z
compiled_to: "[[Portfolio Update: Light Mode Contrast and Skill Graph Expansion]]"
processed_at: 2026-04-13T17:46:02.205Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix(ui): boost light mode contrast, add new projects to skill graph

- **Repo:** rahilsinghi/portfolio
- **SHA:** ca944fc
- **Date:** 2026-04-08T22:56:34Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +127
- **Deletions:** -42

Light mode:
- Darken muted/border CSS variables for visible section dividers and text
- Deepen accent green (#00802A → #006B22) for vibrancy
- Invert ticker cards (black bg, light text) for contrast on light page
- Fix KnowledgeGraph canvas labels (hardcoded #F0EDE6 → theme-aware)
- Boost graph edge alpha and node outlines in light mode
- Bump hackathon detail text opacity (/50-/65 → /70-/90)

Skill graph:
- Add Karen, Flock, Ask NYC, MarkPush project nodes
- Add ElevenLabs, Google ADK, Vercel AI SDK, Gemini Vision, Twilio, Next.js tech nodes
- Wire all new project→tech edges and cross-skill relationships

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
