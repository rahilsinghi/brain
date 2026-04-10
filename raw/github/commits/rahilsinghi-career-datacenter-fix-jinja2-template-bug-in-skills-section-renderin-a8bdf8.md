---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:a1ee4f8
ingested_at: 2026-04-10T09:03:48.666Z
parsed_at: 2026-04-10T09:03:48.666Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupczViQFvF9UCM32yxT"}
compile_progress: null
---



# Fix Jinja2 template bug in skills section rendering

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** a1ee4f8
- **Date:** 2026-02-13T00:39:19Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +1
- **Deletions:** -1

Changed skill_category.items to skill_category['items'] in the
LaTeX template to prevent Jinja2 from accessing the dict's .items()
method instead of the 'items' field.

Before: Rendered as "<built-in method items of dict object at 0x...>"
After: Properly renders comma-separated skill lists

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
