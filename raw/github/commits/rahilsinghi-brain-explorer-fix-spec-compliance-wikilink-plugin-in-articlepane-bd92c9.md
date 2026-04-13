---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:2bfc8f9
ingested_at: 2026-04-13T17:05:37.785Z
parsed_at: 2026-04-13T17:05:37.785Z
compiled_to: "[[Brain-Explorer: Spec Compliance - Wikilink Rendering, Palette Filters, and Code Cleanup]]"
processed_at: 2026-04-13T17:45:19.774Z
retry_count: 0
last_error: null
compile_progress: null
---



# fix: spec compliance — wikilink plugin in ArticlePanel, from: filter in palette, remove dead code

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** 2bfc8f9
- **Date:** 2026-04-10T18:32:46Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +12
- **Deletions:** -12

- Add remarkWikilinks to ArticlePanel's ReactMarkdown plugins so [[wikilinks]]
  render as clickable spans (was missing, raw [[text]] would have shown)
- Add from: prefix filter in CommandPalette (e.g., from:github, from:voice)
- Remove unused fetchGraphData function from graph-data.ts

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
