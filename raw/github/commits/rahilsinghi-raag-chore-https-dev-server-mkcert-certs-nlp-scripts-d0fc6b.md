---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:7aa0af6
ingested_at: 2026-04-10T04:04:34.858Z
parsed_at: 2026-04-10T04:04:34.858Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuRo6WDjE5FECnxPWYkj"}
compile_progress: null
---



# chore: HTTPS dev server + mkcert certs + NLP scripts

- **Repo:** rahilsinghi/raag
- **SHA:** 7aa0af6
- **Date:** 2026-03-04T16:22:32Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +410
- **Deletions:** -2

- Enable --experimental-https with mkcert certs in start.sh
- Add CORS origins for https://127.0.0.1:3000
- Add certs/ to .gitignore
- Add batch_ingest_all.py and run_nlp.py utility scripts

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
