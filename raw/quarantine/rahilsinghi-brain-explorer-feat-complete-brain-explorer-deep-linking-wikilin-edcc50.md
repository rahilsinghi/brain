---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/brain-explorer:af721ab
ingested_at: 2026-04-12T23:04:19.828Z
parsed_at: 2026-04-12T23:04:19.828Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24pq3viFSk31dJNbA61"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:52.135Z
---






# feat: complete brain explorer — deep-linking, wikilink events, all components

- **Repo:** rahilsinghi/brain-explorer
- **SHA:** af721ab
- **Date:** 2026-04-10T18:27:31Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +107
- **Deletions:** -46

GraphView contains all hooks, effects, and rendering logic: deep-link ?focus=
param sync, brain:focus CustomEvent listener for wikilink navigation, Esc to
clear. page.tsx becomes a thin dynamic import wrapper (ssr: false) to prevent
r3f Canvas from failing at prerender time.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
