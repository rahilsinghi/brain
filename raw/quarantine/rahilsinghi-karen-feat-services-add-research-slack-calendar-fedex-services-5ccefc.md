---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:ffd88e0
ingested_at: 2026-04-12T23:04:19.862Z
parsed_at: 2026-04-12T23:04:19.862Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24pNn82VhWjLjHm8wcm"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:46.025Z
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
