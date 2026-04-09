---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:9c7cd77
ingested_at: 2026-04-09T05:03:49.984Z
parsed_at: 2026-04-09T05:03:49.984Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: MCP server with search tools and agentic chat API

- **Repo:** rahilsinghi/raag
- **SHA:** 9c7cd77
- **Date:** 2026-03-04T00:16:57Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +606
- **Deletions:** -0

- FastMCP server with 7 tools: search_by_mood, search_by_lyrics,
  search_bars, get_song_context, download/search YouTube audio
- Search tools: CLAP audio search, sentence-transformer lyric search,
  bar-level search with annotation/MC filters
- Agentic chat endpoint: Claude + tool loop until final text response
- Pydantic response models for typed tool results

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
