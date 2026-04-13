---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:d62666f
ingested_at: 2026-04-13T17:05:37.747Z
parsed_at: 2026-04-13T17:05:37.747Z
compiled_to: "[[Gemini LLM Provider with Dual-Key Rotation and Auto-Fallback in Brain Project]]"
processed_at: 2026-04-13T17:26:29.512Z
retry_count: 0
last_error: null
compile_progress: null
---



# feat(llm): add Gemini provider with dual-key rotation and auto-fallback

- **Repo:** rahilsinghi/brain
- **SHA:** d62666f
- **Date:** 2026-04-10T12:28:50Z
- **Author:** Rahil Singhi
- **Files changed:** 21
- **Additions:** +3665
- **Deletions:** -89

New LLM abstraction layer (src/llm/provider.ts) supports Anthropic and
Gemini with automatic fallback on billing/quota errors. Two Gemini API
keys rotate on failure with 5-min cooldown. All 6 LLM call sites
(compiler, synthesizer, classifier, daily log, slides, plots) now use
the unified generate() function. Set BRAIN_LLM_PROVIDER=gemini|auto.

Also adds 10 dense repo profile markdowns to raw/repo-profiles/ for
knowledge base ingestion (AskNYC, Career-Datacenter, gaze-diffuse,
Karen, MarkPush, ouroboros, portfolio, superpowers, claw-code, claude-howto).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
