---
title: Comprehensive Resume Validation Layer
author: ai
created_at: 2026-04-13T16:10:13.419Z
last_ai_edit: 2026-04-13T16:10:13.419Z
last_human_edit: null
last_embedded_hash: f4c84b2088ad1ab8
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-comprehensive-resume-validation-layer-f60d60.md]]"
tags:
  - resume
  - validation
  - llm
  - hallucination
  - career-datacenter
  - data quality
---


# Comprehensive Resume Validation Layer

This article details the implementation of `ResumeValidator` within the `Career-Datacenter` project, designed to combat LLM hallucinations in generated resume data. It validates various resume sections against a knowledge base before PDF rendering, ensuring data accuracy and preventing factual errors like fabricated companies or incorrect dates.

## Key Concepts

ResumeValidator,LLM Hallucinations,ValidationResult,Career-Datacenter Knowledge Base,Resume Generation

## Details

The `ResumeValidator` is a critical component implemented in the `rahilsinghi/Career-Datacenter` repository (SHA: 50ed7c2, Date: 2026-02-14) that validates generated resume data against the existing knowledge base. Its primary goal is to catch Large Language Model (LLM) hallucinations before the resume PDFs are rendered.

**Key Features:**
*   **Header Validation:** Checks for correctness in name, email, and phone number.
*   **Education Validation:** Verifies institution names, locations, GPAs, and dates.
*   **Experience Validation:** Confirms company names, employment dates, and locations.
*   **Project Misclassification Detection:** Identifies projects erroneously listed as professional experiences.
*   **Fabricated Company Detection:** Flags any company names not present in the internal knowledge base.
*   **Skills Formatting Validation:** Ensures consistent and correct formatting of skills, catching potential template rendering issues.
*   **Date Range Validation:** Includes checks for year mismatches within date ranges.

**Validation Severity Levels:**
*   **CRITICAL:** Indicates factual errors such as wrong dates, fabricated data, or incorrect GPAs. Resumes with critical errors are marked as 'fail'.
*   **WARNING:** Denotes minor issues, e.g., shortened project names.
*   **INFO:** Provides informational notes without impacting the pass/fail status.

The validator returns a `ValidationResult` object, which contains a list of all identified issues with their context, a formatted report suitable for display, and a pass/fail status (a 'fail' is triggered by any critical errors).

**Example Usage:**
```python
    validator = ResumeValidator()
    result = validator.validate(resume_data)

    if result.has_errors():
        print(result.format_report())
        # Don't send resume to employers!
```
This solution directly addresses a common problem identified during testing, where local LLMs would generate incorrect institution names, fabricate companies, and produce inaccurate dates, thus enhancing the reliability of the automated resume generation process.

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>

## Related

[[Career-Datacenter]],[[Anti-Hallucination Constraints in Resume Generation]],[[Career-Datacenter: Initial Documentation and Gitignore Setup]],[[Add Resume PDFs to Public Directory]],[[ApplicationBatchRunner for Automated Job Application Generation]]
