---
title: Cover Letter Style Variants
author: ai
created_at: 2026-04-10T17:40:30.404Z
last_ai_edit: 2026-04-10T17:40:30.404Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-cover-letter-style-variants-metric-mission-644714.md]]"
tags:
  - cover letter
  - llm
  - configuration
  - style
  - generator
  - career-datacenter
  - prompt engineering
---

# Cover Letter Style Variants

This update introduces configurable style variants for cover letter generation, allowing users to choose between metric-focused, mission-focused, and story-focused hooks. The `CoverLetterGenerator` now reads a `cover_letter.style` setting from `scraper_config.yaml` or an environment variable. The chosen style is then injected into the LLM's system prompt to guide the generation process, with `metric_focused` as the default for backward compatibility.

## Key Concepts

Cover Letter Generation,LLM System Prompt,Configuration Management,Style Variants,Backward Compatibility

## Details

This commit, identified by SHA `f4fe985` in the `rahilsinghi/Career-Datacenter` repository, adds a new configuration option `cover_letter.style` to `scraper_config.yaml`. This configuration allows specifying one of three distinct styles for generating cover letters:

*   **metric_focused**: The default style, emphasizing quantitative achievements and metrics.
*   **mission_focused**: A style that highlights alignment with the organization's mission and values.
*   **story_focused**: A style that uses narrative elements to present qualifications and experiences.

The `CoverLetterGenerator` component has been updated to read this style preference. The style can be set either via the `scraper_config.yaml` file or by using the `COVER_LETTER_STYLE` environment variable, with the environment variable taking precedence. Once a style is determined, a style-specific instruction is injected into the Large Language Model's (LLM) system prompt during the cover letter generation process. This ensures that the LLM generates content tailored to the selected focus.

This change is designed to be non-breaking; existing callers or configurations without the `cover_letter.style` setting will automatically default to the `metric_focused` style, maintaining previous behavior.

## Related

[[Career-Datacenter]],[[CoverLetterGenerator]],[[LLM Prompt Engineering]],[[Configuration Management]]
