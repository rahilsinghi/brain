---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/raag:7aa0af6
ingested_at: 2026-04-13T17:05:37.834Z
parsed_at: 2026-04-13T17:05:37.834Z
compiled_to: "[[HTTPS Development Server and NLP Scripts Integration in raag]]"
processed_at: 2026-04-13T17:16:48.556Z
retry_count: 0
last_error: null
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
