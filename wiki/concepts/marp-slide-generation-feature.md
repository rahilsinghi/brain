---
title: Marp Slide Generation Feature
author: ai
created_at: 2026-04-10T19:22:02.228Z
last_ai_edit: 2026-04-10T19:22:02.228Z
last_human_edit: null
last_embedded_hash: 69685a6239cdbc09
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-output-add-marp-slide-generation-with-error-handling-an-82cd81.md]]"
tags:
  - marp
  - slides
  - generation
  - ai
  - claude
  - output
  - feature
  - automation
  - pdf
  - html
  - wiki
  - brain
  - code
---


# Marp Slide Generation Feature

This feature introduces a `generateSlides()` function in the `rahilsinghi/brain` repository. It automates the creation of presentation slides from wiki content, leveraging Claude for Marp markdown generation and `marp-cli` for rendering to PDF/HTML, complete with error handling and cleanup.

## Key Concepts

Marp,Slide Generation,AI-Assisted Content Creation,Error Handling,marp-cli,Wiki Integration

## Details

The `generateSlides()` function orchestrates the process of creating presentation slides from wiki articles. Its workflow involves several key steps:

1.  **Wiki Content Query:** It first queries the relevant wiki content using a `synthesizeFn`.
2.  **AI Markdown Generation:** The retrieved wiki content is then passed as a prompt to Claude, an AI model, which generates presentation content in Marp markdown format.
3.  **File Storage:** The generated Marp markdown is saved to `output/slides/{slug}.md`.
4.  **Rendering:** The `marp-cli` command-line interface is then invoked via a shell command to render the markdown file into both PDF and HTML formats.
5.  **Error Handling and Cleanup:** A crucial aspect of this implementation is its robust error handling. In the event of a failure during the generation or rendering process, the function ensures the cleanup of any partially generated files to maintain system integrity.

## Related

[[Marp]],[[Claude (AI)]],[[Wiki]],[[PDF Generation]],[[HTML Generation]],[[Error Handling Strategies]],[[rahilsinghi/brain]]
