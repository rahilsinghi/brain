---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:5263118
ingested_at: 2026-04-10T04:04:34.944Z
parsed_at: 2026-04-10T04:04:34.944Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRnsSuJezdLP2iF8b26"}
compile_progress: null
---



# feat: test suite and utility scripts for ingestion and verification

- **Repo:** rahilsinghi/raag
- **SHA:** 5263118
- **Date:** 2026-03-04T00:17:18Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +280
- **Deletions:** -0

- pytest fixtures with async DB session and Qdrant client
- MCP tools integration tests
- verify_setup.py: diagnostic checking all services and data counts
- batch_ingest.py: CLI script for end-to-end album ingestion
- reannotate_bars.py: re-run bar annotations for existing songs

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
