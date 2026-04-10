---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/dotfiles:39654f7
ingested_at: 2026-04-10T08:03:40.136Z
parsed_at: 2026-04-10T08:03:40.136Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2H4frXrwS1uiijn7a"}
compile_progress: null
---



# chore: initial claude dotfiles

- **Repo:** rahilsinghi/dotfiles
- **SHA:** 39654f7
- **Date:** 2026-03-24T04:50:19Z
- **Author:** Rahil Singhi
- **Files changed:** 17
- **Additions:** +496
- **Deletions:** -0

Syncs ~/.claude config via symlink for portable setup across machines.
Includes global CLAUDE.md, skills, plugins (submodule), settings, and
install script. Sensitive/machine-specific files are gitignored.

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
