---
title: Cover Letter Style Variants in Career-Datacenter
author: ai
created_at: 2026-04-12T22:20:33.008Z
last_ai_edit: 2026-04-12T22:20:33.008Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-cover-letter-style-variants-metric-mission-644714.md]]"
tags:
  - career-datacenter
  - cover letter
  - llm
  - configuration
  - automation
  - job application
  - system prompt
  - feature
---

# Cover Letter Style Variants in Career-Datacenter

This update introduces configurable cover letter style variants within the Career-Datacenter project, allowing users to choose between 'metric_focused', 'mission_focused', and 'story_focused' hooks. The selected style dynamically instructs the LLM during cover letter generation. This enhancement offers greater flexibility in tailoring application documents.

## Key Concepts

Cover Letter Generation,LLM System Prompt Engineering,Configuration Management (scraper_config.yaml),Environmental Variables,Default Settings

## Details

This commit (`f4fe985`) to the [[Career-Datacenter]] repository, authored by Rahil Singhi and co-authored by Claude Sonnet 4.5, introduces a significant enhancement to the cover letter generation functionality. A new `cover_letter.style` configuration option is added to `scraper_config.yaml`, providing three distinct hook styles:

*   **`metric_focused` (Default)**: Emphasizes quantifiable achievements and impact.
*   **`mission_focused`**: Aligns the applicant's aspirations with the company's mission.
*   **`story_focused`**: Weaves a narrative around the applicant's experiences and motivations.

The `CoverLetterGenerator` component is updated to read this style preference from either the `scraper_config.yaml` file or the `COVER_LETTER_STYLE` environment variable. This selected style is then injected as a specific instruction into the LLM system prompt at the time of cover letter generation, guiding the LLM to produce output consistent with the chosen style.

This change is designed to be non-breaking; existing callers or configurations will default to the `metric_focused` style, ensuring backward compatibility while offering new customization capabilities.

## Related

[[Career-Datacenter]],[[CoverLetterGenerator]],[[Anti-Hallucination Constraints in Resume Generation (Career-Datacenter)]],[[batch_process_overnight.py Enhancements: Job Description Parsing and CLI Flags]]
