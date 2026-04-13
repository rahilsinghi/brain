---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:50ed7c2
ingested_at: 2026-04-13T18:05:31.409Z
parsed_at: 2026-04-13T18:05:31.409Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Add comprehensive resume validation layer

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 50ed7c2
- **Date:** 2026-02-14T16:21:01Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +551
- **Deletions:** -0

Implements ResumeValidator that validates generated resume data against
knowledge base to catch LLM hallucinations before rendering PDFs.

Features:
- Validates header (name, email, phone)
- Validates education (institution names, locations, GPAs, dates)
- Validates experience (company names, dates, locations)
- Detects projects incorrectly listed as experiences
- Detects fabricated companies not in knowledge base
- Validates skills formatting (catches template rendering bugs)
- Date range validation with year mismatch detection

Validation severity levels:
- CRITICAL: Factual errors (wrong dates, fabricated data, wrong GPAs)
- WARNING: Minor issues (shortened project names)
- INFO: Informational notes

Returns ValidationResult with:
- List of all issues found with context
- Formatted report for display
- Pass/fail status (critical errors = fail)

Example usage:
    validator = ResumeValidator()
    result = validator.validate(resume_data)

    if result.has_errors():
        print(result.format_report())
        # Don't send resume to employers!

This solves the hallucination problem identified in testing where
local LLMs generated wrong institution names, fabricated companies,
and incorrect dates.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
