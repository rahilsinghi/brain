---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/dotfiles:39654f7
ingested_at: 2026-04-09T20:03:26.322Z
parsed_at: 2026-04-09T20:03:26.322Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuGdD24Lcc57AKMF786c\"}"
compile_progress: null
quarantined_at: 2026-04-10T02:04:27.053Z
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
