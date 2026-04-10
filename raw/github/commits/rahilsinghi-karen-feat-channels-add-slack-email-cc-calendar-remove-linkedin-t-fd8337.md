---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:2803118
ingested_at: 2026-04-10T07:03:28.813Z
parsed_at: 2026-04-10T07:03:28.813Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZufS58AfxamQku153TGW"}
compile_progress: null
---



# feat(channels): add slack/email_cc/calendar, remove linkedin/twitter, machineDetection on voice

- **Repo:** rahilsinghi/karen
- **SHA:** 2803118
- **Date:** 2026-04-04T15:21:46Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +40
- **Deletions:** -96

- get_available_channels: added slack, research, email_cc; removed linkedin, twitter
- dispatch table: email_cc reuses _send_email, added _send_slack
- _send_voice_call: MachineDetection=DetectMessageEnd, returns call_sid
- _send_calendar: real Google Calendar API via calendar_service
- _send_slack: delegates to slack_service.post_message, stores message_ts
- Deleted _send_linkedin (stub) and _send_twitter (402 CreditsDepleted)

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
