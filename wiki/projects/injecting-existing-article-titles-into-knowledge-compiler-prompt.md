---
title: Injecting Existing Article Titles into Knowledge Compiler Prompt
author: ai
created_at: 2026-04-12T21:40:55.463Z
last_ai_edit: 2026-04-12T21:40:55.463Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-compiler-inject-existing-article-titles-into-compile-pr-545210.md]]"
tags:
  - compiler
  - llm
  - knowledge-graph
  - brain
  - caching
  - hallucination
  - frontmatter
  - wiki
---

# Injecting Existing Article Titles into Knowledge Compiler Prompt

This feature enhances the knowledge compiler in the Brain project by enabling it to retrieve and inject existing wiki article titles into the LLM's compilation prompt. This mechanism, powered by a 5-minute TTL cache, significantly reduces LLM hallucination and promotes accurate cross-referencing within the knowledge base.

## Key Concepts

[[Knowledge Compiler]],[[LLM Hallucination]],[[Frontmatter]],[[Caching]],[[Compile Prompt]]

## Details

The `getExistingTitles()` function, introduced in the [[rahilsinghi/brain]] repository (SHA: `ab998ec`), is designed to scan the `wiki/` directory and extract titles from existing article frontmatter. To optimize performance, this function utilizes a 5-minute Time-To-Live (TTL) cache, preventing repetitive file system reads. The extraction process is capped at 500 titles to manage resource consumption and stay within prompt token limits.

These real article titles are then injected directly into the [[Large Language Model]]'s (LLM) compilation prompt. This strategic injection allows the LLM to form accurate backlinks by referring to actual, verifiable articles instead of 'hallucinating' non-existent topic names. This enhancement, co-authored with [[Claude Opus]], is a critical step towards improving the integrity, accuracy, and interconnectivity of the knowledge graph.

## Related

[[rahilsinghi/brain]],[[Knowledge Compiler]],[[LLM Hallucination]],[[Frontmatter]],[[Caching]],[[Large Language Model]],[[Claude Opus]],[[Compile Prompt]]
