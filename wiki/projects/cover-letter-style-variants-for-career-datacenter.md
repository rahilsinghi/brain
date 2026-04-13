---
title: Cover Letter Style Variants for Career-Datacenter
author: ai
created_at: 2026-04-12T18:21:01.130Z
last_ai_edit: 2026-04-12T18:21:01.130Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-cover-letter-style-variants-metric-mission-644714.md]]"
tags:
  - career-datacenter
  - cover letter
  - llm
  - configuration
  - system prompt
  - job search automation
---

# Cover Letter Style Variants for Career-Datacenter

This update introduces configurable cover letter style variants within the Career-Datacenter project, allowing users to choose between metric-focused, mission-focused, and story-focused hooks. The system integrates these styles into the LLM prompt during cover letter generation. This feature provides flexibility without introducing breaking changes, as `metric_focused` remains the default.

## Key Concepts

Cover Letter Generation,LLM System Prompt Engineering,Configurable Styles,Metric-focused hooks,Mission-focused hooks,Story-focused hooks

## Details

This commit to the [[Career-Datacenter]] repository (SHA: `f4fe985`) adds a significant enhancement to the cover letter generation process. A new `cover_letter.style` configuration option has been introduced in `scraper_config.yaml`. This option allows users to specify one of three distinct styles for generating cover letters:

*   **Metric-focused (Default):** Emphasizes quantifiable achievements and impact.
*   **Mission-focused:** Highlights alignment with the company's mission and values.
*   **Story-focused:** Crafts a narrative around personal experiences and career journey.

The `CoverLetterGenerator` component now reads the desired style from either the `scraper_config.yaml` or the `COVER_LETTER_STYLE` environment variable. At the time of generation, this chosen style is injected as a specific instruction into the [[LLM System Prompt]] to guide the language model's output. This ensures that the generated cover letter adheres to the user's preferred communication approach.

Crucially, this change is implemented without breaking existing functionality; previous callers will continue to receive metric-focused cover letters by default, maintaining backward compatibility.

## Related

[[Career-Datacenter]],[[CoverLetterGenerator]],[[LLM System Prompt]]
