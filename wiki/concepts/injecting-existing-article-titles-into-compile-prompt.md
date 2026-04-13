---
title: Injecting Existing Article Titles into Compile Prompt
author: ai
created_at: 2026-04-11T00:28:25.804Z
last_ai_edit: 2026-04-11T00:28:25.804Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-compiler-inject-existing-article-titles-into-compile-pr-545210.md]]"
tags:
  - compiler
  - llm
  - wiki
  - brain
  - caching
  - hallucination
  - knowledge management
  - frontmatter
---

# Injecting Existing Article Titles into Compile Prompt

This feature enhances the knowledge compilation process in the `rahilsinghi/brain` repository by injecting a cached list of existing wiki article titles into the LLM's compile prompt. This mechanism aims to reduce LLM hallucination by guiding the model to link to actual, verifiable topics within the wiki.

## Key Concepts

Knowledge Compilation,LLM Hallucination Reduction,Wiki Article Linking,Caching Mechanism,Frontmatter Extraction

## Details

The `rahilsinghi/brain` repository implements a new feature that dynamically injects existing wiki article titles into the LLM's compile prompt. This is achieved through a newly introduced `getExistingTitles()` function.

This function operates by traversing the `wiki/` directory to extract titles from the frontmatter of all available wiki articles. To optimize performance and resource usage, `getExistingTitles()` incorporates a 5-minute Time-To-Live (TTL) cache, ensuring that the list of titles is fresh but not re-generated excessively. The number of extracted titles is capped at 500.

The primary motivation for this enhancement is to mitigate the issue of LLM hallucination. By providing the LLM with a concrete list of existing article titles, it is better equipped to create accurate and relevant internal links within new content, fostering a more interconnected and reliable knowledge base. This commitment, identified by SHA `ab998ec` and dated `2026-04-10T22:59:07Z`, was authored by Rahil Singhi and co-authored by Claude Opus 4.6.

## Related

[[brain — Git Activity]],[[Anti-Hallucination Constraints in Resume Generation]],[[Anti-Hallucination Constraints in Resume Generation (Career-Datacenter)]],[[Brain Vault Structure and Project Configuration Scaffolding]],[[Compile Queue Enhancements (rahilsinghi/brain)]],[[Compile Queue with Token Guard Routing, Quarantine, and Index Updates]]
