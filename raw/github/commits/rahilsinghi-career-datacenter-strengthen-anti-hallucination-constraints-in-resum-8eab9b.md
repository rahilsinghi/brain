---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/Career-Datacenter:62fecf8
ingested_at: 2026-04-13T18:05:31.409Z
parsed_at: 2026-04-13T18:05:31.409Z
compiled_to: "[[Anti-Hallucination Constraints in Resume Generation]]"
processed_at: 2026-04-13T18:07:46.030Z
retry_count: 0
last_error: null
compile_progress: null
---



# Strengthen anti-hallucination constraints in resume generation

- **Repo:** rahilsinghi/Career-Datacenter
- **SHA:** 62fecf8
- **Date:** 2026-02-13T00:39:33Z
- **Author:** Rahil Singhi
- **Files changed:** 1
- **Additions:** +13
- **Deletions:** -3

Added explicit anti-hallucination rules to system prompt:
- Must use EXACT data from knowledge base (no modifications)
- Cannot change institution names, dates, locations, or GPAs
- Cannot invent experiences or move projects to experience section
- Must use exact dates as provided (e.g., "May 2025" not "June 2023")

Fixed instruction that was causing fabricated "Antler-backed Startup":
- Changed from: "mention Employee #3 at Antler-backed startup"
- Changed to: "mention Employee #3 at Kismet"

This significantly reduces hallucinations from local LLMs, fixing issues
where generated resumes had wrong institution names (Sri Sathya Sai
Institute instead of SSN College), wrong locations (Chittoor instead of
Chennai), and fabricated companies.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
