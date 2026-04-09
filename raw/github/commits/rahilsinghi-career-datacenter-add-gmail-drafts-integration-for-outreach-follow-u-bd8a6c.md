---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:5f98407
ingested_at: 2026-04-09T03:18:47.777Z
parsed_at: 2026-04-09T03:18:47.777Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Add Gmail Drafts integration for outreach follow-ups

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 5f98407
- **Date:** 2026-03-04T21:33:51Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +289
- **Deletions:** -0

- New cli/gmail_drafts.py: creates real Gmail Drafts via IMAP using App Password
- Drafts appear in Gmail UI for review before sending (no OAuth setup needed)
- Pre-loaded Rogers Leo (Mews) follow-up draft due 2026-03-06
- Integrated into hospitality_outreach.py: drafts-list, draft <id>, drafts-all commands
- App Password stored in .env (git-ignored)

Usage: python cli/gmail_drafts.py --draft mews-rogers

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
