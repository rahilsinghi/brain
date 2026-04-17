---
title: Resume Data Validation Layer
author: ai
created_at: 2026-04-10T21:30:35.348Z
last_ai_edit: 2026-04-10T21:30:35.348Z
last_human_edit: null
last_embedded_hash: a4c85acb07fa1716
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-comprehensive-resume-validation-layer-f60d60.md]]"
tags:
  - resume
  - validation
  - llm
  - hallucinations
  - data integrity
  - software development
  - career-datacenter
  - python
  - testing
---


# Resume Data Validation Layer

This layer introduces a `ResumeValidator` to critically evaluate LLM-generated resume data. It aims to prevent hallucinations and factual errors by comparing generated content against a knowledge base before final PDF rendering. The system categorizes issues by severity and provides a detailed report with a pass/fail status.

## Key Concepts

Resume Validation,LLM Hallucinations,Data Integrity,Knowledge Base Integration,Validation Severity Levels,`ResumeValidator`,`ValidationResult`

## Details

The `Resume Data Validation Layer` was implemented as part of the [[Career-Datacenter Project]] (SHA `50ed7c2` by [[Rahil Singhi]] on 2026-02-14) to address issues with [[LLM Hallucinations]] identified during testing. Specifically, local LLMs were observed generating incorrect institution names, fabricating companies, and producing inaccurate dates in resume data.

The core component is the `ResumeValidator`, which performs a comprehensive set of checks:

*   **Header Validation:** Checks fields like name, email, and phone number.
*   **Education Validation:** Verifies institution names, locations, GPAs, and dates against a knowledge base.
*   **Experience Validation:** Ensures company names, dates, and locations are accurate and valid.
*   **Categorization Correction:** Detects if projects are incorrectly listed as experiences.
*   **Fabricated Data Detection:** Identifies and flags companies not present in the knowledge base.
*   **Skills Formatting:** Validates the structure and format of skills to catch template rendering issues.
*   **Date Range Validation:** Includes checks for year mismatches within date ranges.

**Validation Severity Levels:**
The validation process categorizes detected issues into distinct severity levels:
*   `CRITICAL`: Denotes factual errors such as wrong dates, fabricated data, or incorrect GPAs. Critical errors result in a 'fail' status.
*   `WARNING`: Indicates minor issues, such as shortened project names.
*   `INFO`: Provides informational notes.

The `ResumeValidator` returns a `ValidationResult` object which contains:
*   A list of all identified issues, each with contextual information.
*   A pre-formatted report suitable for display.
*   A pass/fail status, where the presence of any `CRITICAL` error leads to a 'fail'.

**Example Usage:**
```python
validator = ResumeValidator()
result = validator.validate(resume_data)

if result.has_errors():
    print(result.format_report())
    # Action: Do not send resume to employers if critical errors are present.
```

## Related

[[Career-Datacenter Project]],[[LLM Hallucinations]],[[Rahil Singhi]],[[Resume PDF Generation]],[[Software Testing]]
