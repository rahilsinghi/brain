---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:f165982
ingested_at: 2026-04-12T23:04:19.864Z
parsed_at: 2026-04-12T23:04:19.864Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24f6udeSehiQNaZmPxP"}
compile_progress: null
quarantined_at: 2026-04-13T16:11:40.169Z
---






# feat: channel integrations and personality service

- **Repo:** rahilsinghi/karen
- **SHA:** f165982
- **Date:** 2026-04-04T13:30:34Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +1053
- **Deletions:** -0

Personality service generates messages via Claude Haiku 4.5 across
4 personalities. Channel service implements 10 integrations: email
(Resend), SMS/WhatsApp/voice (Twilio), LinkedIn, Calendar, Discord,
GitHub, Twitter, and FedEx PDF (WeasyPrint). De-escalation service
reverses actions in sequence. PDF service generates print-ready letters.
