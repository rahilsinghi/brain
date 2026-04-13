---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:878d00f
ingested_at: 2026-04-13T00:04:31.095Z
parsed_at: 2026-04-13T00:04:31.095Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24oSBUovK87z892SCNm"}
compile_progress: null
quarantined_at: 2026-04-13T16:13:33.201Z
---






# Add responsive HTML email digest template

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 878d00f
- **Date:** 2026-02-17T21:58:19Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +97
- **Deletions:** -0

templates/email_digest.html:
- Dark-themed, mobile-friendly layout
- Summary stat cards: scraped / passed filter / high-fit / apps generated
- Two job tiers: Excellent Match (≥9.0) and Great Match (8.0–8.9)
- Per-job cards: title, company, location, salary, description snippet, apply button
- Jinja2-rendered via email_digest.py
- Dashboard link in footer

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
