---
title: Marp Slide Generation with Claude and Error Handling
author: ai
created_at: 2026-04-11T01:30:32.663Z
last_ai_edit: 2026-04-11T01:30:32.663Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-output-add-marp-slide-generation-with-error-handling-an-82cd81.md]]"
tags:
  - marp
  - slide generation
  - claude
  - automation
  - wiki
  - pdf
  - html
  - error handling
  - rahilsinghi/brain
  - content generation
  - presentation
  - markdown
---

# Marp Slide Generation with Claude and Error Handling

This feature, implemented in the `rahilsinghi/brain` repository, automates the creation of presentation slides. It leverages [[Claude]] to synthesize wiki content into [[Marp]] markdown, then renders these into PDF and HTML presentations, incorporating robust error handling and cleanup mechanisms.

## Key Concepts

Marp slide generation,Claude for content synthesis,Markdown to PDF/HTML conversion,Error handling and cleanup mechanisms,Automated content workflow

## Details

The `generateSlides()` function, introduced in commit `600aa70` by Rahil Singhi (co-authored by Claude Sonnet 4.6) within the `rahilsinghi/brain` repository, provides an automated pipeline for creating presentation slides.

**Functionality Breakdown:**

1.  **Wiki Content Query**: The process begins by querying the wiki using a `synthesizeFn` to retrieve relevant information or data. This acts as the source material for the slide content.
2.  **Claude-Powered Markdown Generation**: The retrieved wiki content is then fed to [[Claude]] (specifically noted as Claude Sonnet 4.6 for this commit), which is prompted to generate [[Marp]]-compatible markdown. Marp is a markdown presentation ecosystem that allows for easy creation of slides from plain text.
3.  **File Output**: The generated Marp markdown content is saved to the local file system at `output/slides/{slug}.md`, where `{slug}` typically refers to a unique identifier for the slide deck.
4.  **Presentation Rendering**: The system then shells out to the `marp-cli` command-line interface tool. This tool takes the generated markdown file and converts it into high-quality PDF and HTML presentation formats.
5.  **Robust Error Handling and Cleanup**: A critical aspect of this implementation is its built-in error handling. In the event of failures during the generation or rendering process, the system includes mechanisms to clean up any partial or temporary files, ensuring a tidy state and preventing accumulation of half-generated artifacts.

## Related

[[rahilsinghi/brain]],[[Claude]],[[Marp]],[[CLAUDE.md]],[[Brutal Visual Templates Integration]]
