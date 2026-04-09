---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:eb2b8a0
ingested_at: 2026-04-09T04:03:38.395Z
parsed_at: 2026-04-09T04:03:38.395Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Integrate validation layer into application generation pipeline

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** eb2b8a0
- **Date:** 2026-02-14T16:21:11Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +35
- **Deletions:** -1

Added validation step after resume generation and before PDF rendering:

1. Generate resume data with LLM
2. Validate against knowledge base ← NEW STEP
3. Show validation report if issues found
4. Block PDF generation if critical errors detected
5. Allow user to proceed for debugging if needed

Flow:
- If validation passes: Continue to PDF generation
- If warnings only: Show warnings, continue
- If critical errors: Show report, prompt user to abort

This prevents sending resumes with hallucinated data to employers.
Users get clear feedback about what's wrong before PDFs are created.

Example output:
    ✅ Resume data generated
    🔍 Validating resume data against knowledge base...
    🔴 CRITICAL ISSUES (2):
        - Wrong institution name (fabricated)
        - Date year mismatch (possible hallucination)

    ❌ CRITICAL ERRORS FOUND - Resume contains hallucinations!
       Generate anyway (for debugging)? [y/N]:

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
