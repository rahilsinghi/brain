---
title: Marp Slide Generation with Error Handling in Brain Repository
author: ai
created_at: 2026-04-11T01:34:31.849Z
last_ai_edit: 2026-04-11T01:34:31.849Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-output-add-marp-slide-generation-with-error-handling-an-82cd81.md]]"
tags:
  - marp
  - slide generation
  - claude
  - automation
  - cli
  - error handling
  - brain
  - output
---

# Marp Slide Generation with Error Handling in Brain Repository

This feature introduces `generateSlides()` functionality to the `rahilsinghi/brain` repository, enabling automated generation of presentation slides. It leverages Claude for Marp Markdown content creation, renders output using `marp-cli`, and includes robust error handling with cleanup of partial files.

## Key Concepts

Marp Markdown,Slide Generation,LLM Integration (Claude),CLI Automation,Error Handling,File Cleanup

## Details

The `generateSlides()` function, implemented in the `rahilsinghi/brain` repository (SHA: 600aa70, dated 2026-04-09), automates the process of creating presentation slides from wiki content. Authored by Rahil Singhi, with co-authorship from Claude Sonnet 4.6, this feature involves a multi-step workflow:

1.  **Wiki Query**: The system first queries the wiki using a `synthesizeFn` to retrieve relevant information.
2.  **Claude Prompting**: It then prompts the Claude large language model to generate Marp Markdown content based on the queried wiki data.
3.  **File Output**: The generated Marp Markdown is written to `output/slides/{slug}.md`, where `{slug}` refers to a unique identifier for the slide deck.
4.  **Rendering**: The `marp-cli` tool is then shelled out to, converting the Marp Markdown into presentation formats such as PDF or HTML.
5.  **Error Handling and Cleanup**: A critical component of this implementation is its robust error handling. In the event of a failure during the generation or rendering process, partial files are automatically cleaned up to maintain a tidy output directory and prevent corrupted artifacts.

This commit involved changes to 2 files, adding 199 lines of code without any deletions.

## Related

[[Brain Repository Wiki Watcher and Nightly Operations]],[[CLAUDE.md for Project Context and Session Persistence]],[[Claude How To]],[[Brutalist Visual Templates Integration (Marp, Matplotlib, Mermaid)]]
