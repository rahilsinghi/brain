---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:c3e6207
ingested_at: 2026-04-09T01:03:46.914Z
parsed_at: 2026-04-09T01:03:46.914Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# feat(dashboard): collapsible QR code bridge section

- **Repo:** rahilsinghi/askNYC
- **SHA:** c3e6207
- **Date:** 2026-03-28T15:15:29Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +41
- **Deletions:** -19

QR code now hidden by default behind a SHOW/HIDE toggle button.
Saves sidebar space when the remote phone isn't needed.
