---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:ffd88e0
ingested_at: 2026-04-10T15:04:13.394Z
parsed_at: 2026-04-10T15:04:13.394Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat(services): add research, slack, calendar, fedex services + QR code in PDF

- **Repo:** rahilsinghi/karen
- **SHA:** ffd88e0
- **Date:** 2026-04-04T15:10:53Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +371
- **Deletions:** -1

Tasks 2-5 of escalation ladder v2:
- research_service.py: pre-cached OSINT lookup with timed animation steps
- slack_service.py: post/delete via Slack Web API (chat.postMessage/chat.delete)
- calendar_service.py: Google Calendar event creation/deletion via service account
- fedex_service.py: sandbox rate quote with $28.40 fallback (never "unavailable")
- pdf_service.py: QR code generation (qrcode lib, base64 PNG) embedded in letter
- formal_letter.html: QR section linking to rahilsinghi.com/open-matters
- requirements.txt: qrcode, pillow, google-api-python-client, google-auth

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
