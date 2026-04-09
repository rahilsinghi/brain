---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:a1e05d6
ingested_at: 2026-04-09T03:18:47.776Z
parsed_at: 2026-04-09T03:18:47.776Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Add SMTP send capability and update signature URLs

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** a1e05d6
- **Date:** 2026-03-04T22:10:55Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +102
- **Deletions:** -20

- Add send_email(), send_followup(), send_all_followups() via SMTP
- New CLI flags: --send <id>, --send-all, --exclude <company>
- Update RESUME_URL, LINKEDIN_URL, GITHUB_URL with correct links
- Sent 19/19 non-Mews follow-ups successfully

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
