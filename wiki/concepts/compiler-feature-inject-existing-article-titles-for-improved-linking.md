---
title: "Compiler Feature: Inject Existing Article Titles for Improved Linking"
author: ai
created_at: 2026-04-12T17:40:37.210Z
last_ai_edit: 2026-04-12T17:40:37.210Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-compiler-inject-existing-article-titles-into-compile-pr-545210.md]]"
tags:
  - compiler
  - brain project
  - llm
  - wikilinking
  - knowledge graph
  - optimization
  - caching
  - frontmatter
  - accuracy
---

# Compiler Feature: Inject Existing Article Titles for Improved Linking

This commit introduces a significant enhancement to the knowledge compiler in the Brain Project, allowing it to inject existing wiki article titles into the compilation prompt. By leveraging a cached list of real article titles, the LLM can generate more accurate and relevant internal links, significantly reducing hallucinated topic names.

## Key Concepts

[[Brain Project]],[[Knowledge Compilation]],[[LLM]] (Large Language Model),[[Wikilinking]],[[Frontmatter]],[[Caching]],[[Hallucination (AI)]]

## Details

The `rahilsinghi/brain` repository received an update (SHA `ab998ec`) that integrates a new `getExistingTitles()` function into its knowledge compilation process. This function scans the `wiki/` directory to extract titles from existing articles' frontmatter. To optimize performance, the list of titles is cached for 5 minutes, and its size is capped at 500 entries to prevent excessive token usage or processing overhead.

This feature directly addresses the challenge of LLMs hallucinating non-existent topic names when attempting to create internal links (wikilinks). By providing a curated list of actual article titles, the compiler guides the LLM to form connections to real, verifiable content within the knowledge base, thereby enhancing the overall accuracy and navigability of the generated wiki articles.

## Related

[[Brain Project]],[[Compilation and Embedding of Wiki Articles in the Brain Project]],[[Compile Queue Enhancements (rahilsinghi/brain)]],[[Brain Repository: Unstructured Content Copier with Frontmatter Injection]],[[Add LLM Model Constants and Company Info Helper (Commit a9513cd)]]
