---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:073c1fb
ingested_at: 2026-04-10T00:03:23.819Z
parsed_at: 2026-04-10T00:03:23.819Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM5z2BcTwJrn9CqLE8v"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:57.307Z
---






# fix(scoreboard): resolve venv tool paths for ruff, radon, and python

- **Repo:** rahilsinghi/ouroboros
- **SHA:** 073c1fb
- **Date:** 2026-04-04T03:42:50Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +19
- **Deletions:** -6

ruff/radon/python were invoked as bare commands, failing with
FileNotFoundError when not on system PATH (only in venv). Now resolves
via shutil.which + sys.executable fallback, matching tournament.py pattern.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
