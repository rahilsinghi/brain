---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:878d00f
ingested_at: 2026-04-13T18:05:31.406Z
parsed_at: 2026-04-13T18:05:31.406Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
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
