---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:c9569d8
ingested_at: 2026-04-09T21:03:21.280Z
parsed_at: 2026-04-09T21:03:21.280Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM47cHNKozyumuyiHUb"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:31.953Z
---






# Fix knowledge base loader to use correct YAML keys

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** c9569d8
- **Date:** 2026-02-14T16:20:51Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +2
- **Deletions:** -2

Changed education and experience loaders to use "entries" key instead
of "education" and "experiences" to match the actual YAML file structure.

Before: load_education() returned empty list
After: Correctly loads education entries from education.yaml

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
