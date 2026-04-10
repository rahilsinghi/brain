---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/brain:bfa63b9
ingested_at: 2026-04-10T08:03:40.123Z
parsed_at: 2026-04-10T08:03:40.123Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2JQ3CoE2jfM7hnvG1"}
compile_progress: null
---



# feat(sources): add git-commits source with 60-day backfill across all repos

- **Repo:** rahilsinghi/brain
- **SHA:** bfa63b9
- **Date:** 2026-04-08T23:17:54Z
- **Author:** Rahil Singhi
- **Files changed:** 27
- **Additions:** +1496
- **Deletions:** -35

Polls /repos/{owner}/{repo}/commits for each active repo via gh CLI.
601 commits ingested from 15 repos, compiled into 15 per-repo wiki
articles via Claude API with [[wiki links]] for knowledge graph edges.

- New SyncSource: git-commits with cursor-based polling and skipStats
- Seed step: pnpm seed:git-commits for 60-day historical backfill
- Daemon: hourly cron alongside existing GitHub source
- Orchestrator: per-item error handling (ENAMETOOLONG no longer fatal)
- Slug truncation for verbose commit messages
- launchd plist for auto-start daemon on macOS login
- 230 tests across 41 files, 113 wiki articles, 648 vector chunks

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
