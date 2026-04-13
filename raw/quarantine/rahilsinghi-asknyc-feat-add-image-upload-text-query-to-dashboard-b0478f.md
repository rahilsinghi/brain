---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:676e784
ingested_at: 2026-04-12T23:04:19.872Z
parsed_at: 2026-04-12T23:04:19.872Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24k6Bcn6DTE2sn831BX"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:47.921Z
---






# feat: add image upload + text query to dashboard

- **Repo:** rahilsinghi/askNYC
- **SHA:** 676e784
- **Date:** 2026-03-28T01:53:10Z
- **Author:** Rahil Singhi
- **Files changed:** 6
- **Additions:** +200
- **Deletions:** -48

- Drop zone in CameraFeed: drag-and-drop or click to upload a photo
- Text input in IntelligenceBrief: type a question and hit ASK
- Dashboard sends { type: dashboard_query, image, text } over existing WS
- Backend forwards image via send_video_frame, text via new send_text()
- send_text() uses LiveRequestQueue.send_content() for non-audio input
- Enables full demo without phone or HTTPS deployment
