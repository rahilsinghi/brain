---
title: Marp Slide Generation with Error Handling and Cleanup
author: ai
created_at: 2026-04-13T17:41:42.274Z
last_ai_edit: 2026-04-13T17:41:42.274Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-output-add-marp-slide-generation-with-error-handling-an-82cd81.md]]"
tags:
  - marp
  - slide generation
  - automation
  - cli
  - error handling
  - brain project
  - claude
  - markdown
---

# Marp Slide Generation with Error Handling and Cleanup

This feature introduces the `generateSlides()` function, enabling automated slide generation from wiki articles. It leverages the `synthesizeFn` to query wiki content, uses Claude to produce Marp markdown, and then renders these into PDF/HTML slides via `marp-cli`. The implementation includes robust error handling and cleanup of temporary files upon failure.

## Key Concepts

Marp,Claude,Slide Generation,Wiki Article Synthesis,CLI Tool Integration,Error Handling,File Cleanup

## Details

The `generateSlides()` function, implemented within the `rahilsinghi/brain` repository (commit `600aa70`), orchestrates the creation of presentation slides. The workflow involves:
1.  **Content Retrieval**: Queries the wiki for relevant content using a `synthesizeFn`.
2.  **Markdown Generation**: Prompts the Claude AI model to generate Marp-compatible markdown based on the retrieved content.
3.  **File Writing**: Stores the generated Marp markdown in `output/slides/{slug}.md`.
4.  **Rendering**: Executes `marp-cli` as a shell command to transform the markdown into PDF and HTML slide formats.
5.  **Error Handling and Cleanup**: Includes mechanisms to detect failures during the generation or rendering process and automatically cleans up any partially created files, ensuring a clean state. This robust approach prevents accumulation of incomplete or erroneous output.

## Related

[[Brutal Visual Templates Integration (Marp, Matplotlib, Mermaid)]],[[Add CLAUDE.md for Project Context and Session Persistence]],[[Brain Project]],[[API Feature: POST /synthesise Endpoint with Robust Error Handling]],[[Brain Project: Wiki Article Compilation and Embedding Enhancement]]
