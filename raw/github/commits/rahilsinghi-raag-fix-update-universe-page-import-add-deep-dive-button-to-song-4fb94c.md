---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:52dc23b
ingested_at: 2026-04-10T10:04:00.845Z
parsed_at: 2026-04-10T10:04:00.845Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv3GDXxmuXpax3TZGnjo"}
compile_progress: null
---



# fix: update universe page import + add Deep Dive button to SongCard

- **Repo:** rahilsinghi/raag
- **SHA:** 52dc23b
- **Date:** 2026-03-07T00:14:19Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +13
- **Deletions:** -3

Replace deleted NodeDetailPanel import with GraphSidePanel in universe
page. Add BookOpen icon button on SongCard that links to /song/[id]
for the Deep Dive experience.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
