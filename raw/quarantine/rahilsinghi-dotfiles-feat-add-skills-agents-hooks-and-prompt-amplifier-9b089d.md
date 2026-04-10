---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/dotfiles:aab3c96
ingested_at: 2026-04-10T02:04:52.495Z
parsed_at: 2026-04-10T02:04:52.495Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2dP7wLYG865LdVt3x"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:11.810Z
---






# feat: add skills, agents, hooks, and prompt amplifier

- **Repo:** rahilsinghi/dotfiles
- **SHA:** aab3c96
- **Date:** 2026-03-31T02:51:57Z
- **Author:** Rahil Singhi
- **Files changed:** 19
- **Additions:** +1128
- **Deletions:** -12

- 3 new skills: scaffold-next, env-check, deploy
- 4 custom agents: backend-builder, frontend-rapid, security-reviewer, test-writer
- 6 hook scripts: secret blocker, bash validator, prompt amplifier (/+),
  ESLint on write, session init, completion verifier
- SETUP.md: complete reference doc for entire setup
- CLAUDE.md: updated with all new capabilities
- settings.json: all hook configurations wired up
- .gitignore: exclude ephemeral dirs (file-history, image-cache, ide, telemetry)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
