---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/karen:2e8bad6
ingested_at: 2026-04-10T12:03:43.579Z
parsed_at: 2026-04-10T12:03:43.579Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZv4M2692TZEsHVD1LzYt"}
compile_progress: null
---



# fix: level 10 skipped, de-escalation UI, scrollable panels

- **Repo:** rahilsinghi/karen
- **SHA:** 2e8bad6
- **Date:** 2026-04-04T21:11:55Z
- **Author:** Rahil Singhi
- **Files changed:** 3
- **Additions:** +40
- **Deletions:** -5

Backend:
- Add "fedex" to channel skip-exemption list — level 10 was silently
  skipped because FedEx wasn't in the always-available set

Frontend:
- Add deescalation_step to REFRESH_EVENTS so UI updates during resolve
- Add de-escalation sequence panel (checkmarks/crosses for each step)
- Make center column, right sidebar, and Intel Gathered scrollable
- All panels now have overflow-y-auto with custom-scrollbar
