---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:a9513cd
ingested_at: 2026-04-09T03:18:47.778Z
parsed_at: 2026-04-09T03:18:47.778Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Fix: Add LLM model constants and company info helper

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** a9513cd
- **Date:** 2026-02-25T19:03:57Z
- **Author:** Rahil Singhi
- **Files changed:** 2
- **Additions:** +348
- **Deletions:** -0

Added missing model constants to llm_client.py:
- HAIKU = "claude-haiku-4-5-20251001"
- SONNET = "claude-sonnet-4-5-20250929"
- OPUS = "claude-opus-4-6"

Added get_company_info() to company_discovery.py:
- Retrieves company data from CSV or YAML
- Returns category, domain, positioning, etc.
- Used by email generator for context

Fixes ImportError in email_generator and followup_generator.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
