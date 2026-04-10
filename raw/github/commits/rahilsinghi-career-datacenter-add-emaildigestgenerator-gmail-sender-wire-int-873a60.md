---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:5b61407
ingested_at: 2026-04-10T09:03:48.661Z
parsed_at: 2026-04-10T09:03:48.661Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupczFaadn47SXYWKdRY"}
compile_progress: null
---



# Add EmailDigestGenerator + Gmail sender + wire into batch processor

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 5b61407
- **Date:** 2026-02-17T21:59:21Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +247
- **Deletions:** -0

New cli/email_digest.py:
- EmailDigestGenerator class renders templates/email_digest.html via Jinja2
- Groups jobs: tier1 (≥9.0) and tier2 (8.0-8.9), capped at 12 total
- Gmail SMTP sender (starttls) using GMAIL_APP_PASSWORD from .env
- --test: opens rendered HTML in browser for preview
- --send: sends digest email now
- --preview: prints HTML to stdout
- --to: override recipient address

Integrated into batch_process_overnight.py as Step 8:
- Auto-detects GMAIL_APP_PASSWORD; silently skips if not set
- Non-fatal: email failure doesn't crash the batch run

Setup in .env:
  GMAIL_APP_PASSWORD=xxxx-xxxx-xxxx-xxxx
  DIGEST_EMAIL=your@email.com

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
