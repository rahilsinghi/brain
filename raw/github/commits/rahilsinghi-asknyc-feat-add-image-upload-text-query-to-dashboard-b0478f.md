---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/askNYC:676e784
ingested_at: 2026-04-10T15:04:13.427Z
parsed_at: 2026-04-10T15:04:13.427Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
