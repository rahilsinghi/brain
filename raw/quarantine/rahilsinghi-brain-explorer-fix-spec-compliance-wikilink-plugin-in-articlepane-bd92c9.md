---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:2bfc8f9
ingested_at: 2026-04-12T23:04:19.827Z
parsed_at: 2026-04-12T23:04:19.827Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24jsXcYH1XmfGTWEgeV"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:44.871Z
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
