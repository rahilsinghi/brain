---
title: Marp Slide Generation with Error Handling in Brain Project
author: ai
created_at: 2026-04-12T18:10:14.542Z
last_ai_edit: 2026-04-12T18:10:14.542Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-output-add-marp-slide-generation-with-error-handling-an-82cd81.md]]"
tags:
  - marp
  - slide generation
  - claude
  - error handling
  - pdf
  - html
  - brain project
  - automation
---

# Marp Slide Generation with Error Handling in Brain Project

This commit introduces a `generateSlides()` function within the Brain Project, enabling the creation of presentation slides from wiki content. It leverages [[Claude]] to prompt for [[Marp]] markdown, renders slides to PDF/HTML using `marp-cli`, and includes robust error handling with cleanup of partial files.

## Key Concepts

Slide Generation,Marp Markdown,Error Handling,File System Cleanup,PDF Rendering,HTML Rendering,Large Language Models (LLMs),Wiki Content Synthesis

## Details

The `generateSlides()` function is implemented to automate the creation of presentation slides from the wiki's content. It operates by first querying the wiki using a `synthesizeFn` to retrieve relevant information. This synthesized content is then fed to [[Claude]], specifically `Claude Sonnet 4.6` as a co-author, which generates [[Marp]] markdown for the slides.

The generated Marp markdown is written to `output/slides/{slug}.md`. Subsequently, the system shells out to `marp-cli` to convert this markdown into final PDF and HTML slide formats. A critical aspect of this implementation is its robust error handling, which includes cleaning up any partial files that might have been created if the generation process fails.

## Related

[[Brain Project]],[[Brutal Visual Templates Integration (Marp, Matplotlib, Mermaid)]],[[Claude API Rate Limit Retry with Backoff in raag]],[[Wiki Content Synthesis]]
