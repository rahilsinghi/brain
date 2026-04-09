---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/dotfiles:aab3c96
ingested_at: 2026-04-09T01:03:46.911Z
parsed_at: 2026-04-09T01:03:46.911Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
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
