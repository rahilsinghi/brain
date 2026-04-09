---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/ouroboros:073c1fb
ingested_at: 2026-04-09T00:04:28.492Z
parsed_at: 2026-04-09T00:04:28.492Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
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
