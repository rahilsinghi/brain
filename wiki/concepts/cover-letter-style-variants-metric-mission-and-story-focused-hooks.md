---
title: "Cover Letter Style Variants: Metric, Mission, and Story-Focused Hooks"
author: ai
created_at: 2026-04-13T18:46:52.618Z
last_ai_edit: 2026-04-13T18:46:52.618Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-career-datacenter-add-cover-letter-style-variants-metric-mission-644714.md]]"
tags:
  - cover letter
  - llm
  - generation
  - configuration
  - career-datacenter
  - prompt engineering
  - feature
---

# Cover Letter Style Variants: Metric, Mission, and Story-Focused Hooks

This update introduces configurable style variants for cover letters within the Career-Datacenter project, allowing users to generate cover letters with metric-focused, mission-focused, or story-focused hooks. These styles are set via `scraper_config.yaml` or an environment variable, which then dynamically injects style-specific instructions into the LLM system prompt during generation.

## Key Concepts

Cover Letter Generation,LLM Prompt Engineering,Metric-Focused Cover Letter,Mission-Focused Cover Letter,Story-Focused Cover Letter,Configuration Management,Environment Variables

## Details

The `f4fe985` commit to the `rahilsinghi/Career-Datacenter` repository implemented a significant enhancement for [[CoverLetterGenerator]]. It introduced a new configuration option, `cover_letter.style`, within `scraper_config.yaml`.

Users can now choose from three distinct cover letter styles:
*   **metric_focused (default)**: Emphasizes quantitative achievements and results.
*   **mission_focused**: Highlights alignment with the company's goals and vision.
*   **story_focused**: Incorporates narrative elements to convey experience and impact.

The [[CoverLetterGenerator]] is designed to read the preferred style from this configuration file. Alternatively, the style can be overridden using the `COVER_LETTER_STYLE` environment variable. Whichever method is used, the selected style dictates a specific instruction that is injected into the [[LLM]] system prompt at the time of cover letter generation. This allows the [[LLM]] to tailor its output according to the desired rhetorical approach.

This change is designed to be non-breaking; existing callers or configurations without a specified style will default to the `metric_focused` approach.

## Related

[[Career-Datacenter]],[[CoverLetterGenerator]],[[LLM Prompt Engineering]],[[Scraper Configuration]],[[LLM]],[[Environment Variables]]
