---
title: Marp Slide Generation Feature
author: ai
created_at: 2026-04-10T15:20:21.902Z
last_ai_edit: 2026-04-10T15:20:21.902Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-output-add-marp-slide-generation-with-error-handling-an-82cd81.md]]"
tags:
  - marp
  - slide generation
  - automation
  - ai
  - claude
  - wiki
  - pdf
  - html
  - error handling
  - rahil singhi
  - marp-cli
---

# Marp Slide Generation Feature

This entry details the implementation of a `generateSlides()` function within the `rahilsinghi/brain` repository. This feature automates the creation of presentation slides using Marp, leveraging wiki content and Claude AI for Markdown generation. It includes mechanisms for outputting various formats and robust error handling.

## Key Concepts

*   Marp (Markdown Presentation Ecosystem),*   Claude (AI model),*   Wiki Content Synthesis,*   `marp-cli` (Marp Command Line Interface),*   PDF/HTML Generation,*   Error Handling and Cleanup

## Details

The commit `600aa70`, authored by Rahil Singhi on 2026-04-09, introduces the `generateSlides()` function to the `rahilsinghi/brain` repository. This function orchestrates an automated workflow for creating presentation slides:

1.  **Content Synthesis**: It queries the internal wiki for relevant content using a `synthesizeFn`.
2.  **AI-driven Markdown Generation**: The synthesized wiki content is then provided as a prompt to the Claude AI model (specifically Claude Sonnet 4.6, noted as a co-author), which generates Marp-compatible Markdown for the slides.
3.  **File Output**: The generated Marp Markdown is written to a designated output directory, specifically `output/slides/{slug}.md`.
4.  **Rendering**: The system then shells out to `marp-cli` to convert the Marp Markdown file into various presentation formats, including PDF and HTML.
5.  **Error Handling & Cleanup**: A critical component of this implementation is its error handling. In the event of a failure during the slide generation or rendering process, the system is designed to clean up any partial files that may have been created, ensuring a tidy state.

This feature significantly enhances the repository's capabilities by automating content-driven slide generation.

## Related

[[Marp]],[[Claude (AI)]],[[Wiki Content Synthesis]],[[Automated Document Generation]],[[Error Handling Strategies]]
