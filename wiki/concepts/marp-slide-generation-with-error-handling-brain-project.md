---
title: Marp Slide Generation with Error Handling (Brain Project)
author: ai
created_at: 2026-04-12T22:10:25.746Z
last_ai_edit: 2026-04-12T22:10:25.746Z
last_human_edit: null
last_embedded_hash: 3137b4eebbb34ecf
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-output-add-marp-slide-generation-with-error-handling-an-82cd81.md]]"
tags:
  - marp
  - slide generation
  - claude
  - output
  - automation
  - brain project
  - llm integration
  - error handling
---


# Marp Slide Generation with Error Handling (Brain Project)

This commit introduces functionality to generate presentation slides using Marp, powered by wiki content and Claude's natural language capabilities. It automates the process of querying the knowledge base, prompting Claude for Marp markdown, rendering slides to PDF/HTML via `marp-cli`, and ensuring robust error handling with cleanup.

## Key Concepts

Marp Markdown,Slide Generation,LLM Integration (Claude),Error Handling,File System Cleanup,Automated Content Synthesis

## Details

The `generateSlides()` function, implemented within the [[Brain Project]], orchestrates the creation of presentation slides. The workflow involves several key steps:

1.  **Wiki Query**: The system first queries the wiki's knowledge base using a `synthesizeFn` to retrieve relevant information for the presentation.
2.  **Claude Prompting**: The retrieved content is then fed to an LLM, specifically [[Claude Sonnet 4.6]], with a prompt to generate Marp-compatible markdown for the slides.
3.  **File Generation**: The generated Marp markdown is written to a designated output directory (`output/slides/{slug}.md`), where `{slug}` is derived from the wiki article or query topic.
4.  **Marp Rendering**: The system then shells out to `marp-cli`, a command-line interface for Marp, to render the markdown into various formats such as PDF and HTML.
5.  **Error Handling and Cleanup**: Crucially, the implementation includes robust error handling mechanisms. In case of rendering failures or other issues during the process, partial or temporary files are automatically cleaned up to maintain system integrity and prevent accumulation of half-generated assets.

## Related

[[Brain Project]],[[Claude]],[[Brutal Visual Templates Integration (Marp, Matplotlib, Mermaid)]],[[Marp]],[[marp-cli]],[[Error Handling]],[[File System Cleanup]]
