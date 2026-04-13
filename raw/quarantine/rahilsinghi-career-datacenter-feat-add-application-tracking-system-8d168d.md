---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:e7641c5
ingested_at: 2026-04-13T00:04:31.103Z
parsed_at: 2026-04-13T00:04:31.103Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011Ca24kKJu33rodAiqvfKkP"}
compile_progress: null
quarantined_at: 2026-04-13T16:12:50.903Z
---






# feat: Add application tracking system

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** e7641c5
- **Date:** 2026-02-10T21:52:57Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +61
- **Deletions:** -0

applications.csv:
- Tracks company, role, link, location, status, dates
- Links to tailored resume/cover letter versions
- Tracks next actions and deadlines
- Example row included

companies.yaml:
- Company research tracker
- Stores mission, products, tech stack, culture notes
- Tracks employee connections
- Links to careers page, engineering blog
- Application history per company

Enables systematic application pipeline management
