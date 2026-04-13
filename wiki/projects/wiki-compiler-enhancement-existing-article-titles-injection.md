---
title: "Wiki Compiler Enhancement: Existing Article Titles Injection"
author: ai
created_at: 2026-04-13T16:01:40.217Z
last_ai_edit: 2026-04-13T16:01:40.217Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-compiler-inject-existing-article-titles-into-compile-pr-545210.md]]"
tags:
  - compiler
  - llm
  - wiki
  - caching
  - frontmatter
  - prompt engineering
  - hallucination
  - brain project
---

# Wiki Compiler Enhancement: Existing Article Titles Injection

This update to the Brain project's compiler introduces a mechanism to inject a list of existing wiki article titles into the LLM's compilation prompt. By providing real article titles, the system aims to prevent the LLM from hallucinating non-existent topics, enabling more accurate and effective interlinking within the generated wiki content. A 5-minute TTL cache optimizes performance by storing up to 500 frontmatter titles extracted from the `wiki/` directory.

## Key Concepts

LLM Hallucination Prevention,Dynamic Prompt Engineering,Frontmatter Extraction,TTL Caching,Wiki Article Generation,Interlinking

## Details

The `ab998ec` commit introduces a new function, `getExistingTitles()`, within the `rahilsinghi/brain` repository's compiler. This function is designed to scan the `wiki/` directory, parse the frontmatter of each file, and extract the article titles. To enhance efficiency and reduce redundant operations, the extracted titles are stored in a Time-To-Live (TTL) cache, which refreshes every 5 minutes.

A key aspect of this enhancement is the limitation of cached titles to a maximum of 500. This cap is a practical measure to manage memory usage and prompt token limits when these titles are subsequently injected into the Language Model's (LLM) compilation prompt. The primary motivation for this feature is to combat LLM hallucination, a common issue where the model invents non-existent topics or entities.

By providing the LLM with an accurate, up-to-date list of actual wiki article titles, the system guides the model to create valid [[Backfill-Links Scripts Documentation to CLAUDE.md]] to existing content. This significantly improves the quality and interconnectedness of the generated wiki articles, making the entire knowledge base more navigable and reliable. This change is crucial for the ongoing development of the [[Brain Project]], specifically for its [[Brain Project: Wiki Article Compilation and Embedding Enhancement]] capabilities.

## Related

[[Brain Project]],[[Brain Project: Wiki Article Compilation and Embedding Enhancement]],[[Add source_id to RawFrontmatter and Create raw/ Subdirectories for Phase 3 (Brain Project)]],[[API: GET /graph-export Endpoint for Cached Graph Data]],[[Automated Data Ingestion and Wiki Maintenance]],[[Anti-Hallucination Constraints in Resume Generation]],[[Brain Project: CLAUDE.md and REMAINING-WORK.md Updated for Phase 4 Completion]]
