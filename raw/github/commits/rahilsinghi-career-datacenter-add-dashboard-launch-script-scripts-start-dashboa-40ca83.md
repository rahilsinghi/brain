---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:bd86866
ingested_at: 2026-04-10T03:04:49.713Z
parsed_at: 2026-04-10T03:04:49.713Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuMEgNYVT1x2GFu86RCr"}
compile_progress: null
---



# Add dashboard launch script (scripts/start_dashboard.sh)

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** bd86866
- **Date:** 2026-02-17T21:57:48Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +22
- **Deletions:** -0

Simple shell wrapper that activates venv and launches the dashboard.
Usage: ./scripts/start_dashboard.sh [port]
Default port: 8000

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
