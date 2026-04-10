---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:f8f70ce
ingested_at: 2026-04-10T07:03:28.811Z
parsed_at: 2026-04-10T07:03:28.811Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZufSVkFVpNdH6zx3mQAM"}
compile_progress: null
---



# fix(frontend): make personality buttons visually clickable, clarify platform label

- **Repo:** rahilsinghi/karen
- **SHA:** f8f70ce
- **Date:** 2026-04-04T18:38:41Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +33
- **Deletions:** -16

- Personality buttons: glow border + pink highlight + emoji + "SELECTED" badge
- Hover state shows border hint on unselected buttons
- Platform dropdown label changed to "Where Were You Ghosted?"
