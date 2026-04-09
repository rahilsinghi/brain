---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:0a89c35
ingested_at: 2026-04-09T01:03:46.907Z
parsed_at: 2026-04-09T01:03:46.907Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: Could not resolve authentication method. Expected either apiKey or authToken to be set. Or for one of the "X-Api-Key" or "Authorization" headers to be explicitly omitted
compile_progress: null
---



# feat(frontend): update types and constants for v2 ladder

- **Repo:** rahilsinghi/karen
- **SHA:** 0a89c35
- **Date:** 2026-04-04T15:25:40Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +31
- **Deletions:** -13

- KarenEvent: added research_step, research_discovery, fedex_rate types
- LEVEL_LABELS: updated to v2 order (email/sms/whatsapp+voice/osint/etc)
- CHANNEL_ICONS: added email_cc, research, slack; removed linkedin, twitter
- SATISFACTION_LABELS: 11 emoji+label pairs for Karen's satisfaction indicator

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
