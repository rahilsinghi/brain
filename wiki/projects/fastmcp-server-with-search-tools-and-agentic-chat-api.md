---
title: FastMCP Server with Search Tools and Agentic Chat API
author: ai
created_at: 2026-04-10T22:25:47.821Z
last_ai_edit: 2026-04-10T22:25:47.821Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-mcp-server-with-search-tools-and-agentic-chat-api-14a287.md]]"
tags:
  - fastmcp
  - ai
  - agentic
  - search
  - audio
  - lyrics
  - claude
  - pydantic
  - tools
  - rag
  - music
  - development
---

# FastMCP Server with Search Tools and Agentic Chat API

This document describes a FastMCP server integration featuring a suite of 7 specialized search tools for audio and lyrics, alongside an agentic chat API. The server leverages advanced AI models like CLAP and sentence-transformers for search, and integrates Claude for multi-turn conversational interactions and tool usage.

## Key Concepts

- [[FastMCP]],- [[Agentic AI]],- [[AI Tools]],- [[CLAP (Contrastive Language-Audio Pretraining)]],- [[Sentence Transformers]],- [[Pydantic]],- Bar-level search,- Mood-based audio search,- Lyric-based search

## Details

This commit introduces a new FastMCP server implementation, identified by the repository `rahilsinghi/raag` (SHA: `9c7cd77`, dated `2026-03-04T00:16:57Z`). Authored by Rahil Singhi, with co-authorship from Claude Opus 4.6, this server significantly expands its capabilities by integrating 7 distinct tools:

*   **Search by Mood (`search_by_mood`):** Enables searching for audio content based on emotional or thematic moods.
*   **Search by Lyrics (`search_by_lyrics`):** Allows searching for music using lyrical content.
*   **Search Bars (`search_bars`):** Facilitates detailed bar-level search within musical pieces, potentially with annotation and MC (Master of Ceremony) filters.
*   **Get Song Context (`get_song_context`):** Provides contextual information about a given song.
*   **Download/Search YouTube Audio (`download/search YouTube audio`):** Tools for interacting with YouTube audio content.

These search functionalities are powered by specific AI models and techniques:

*   **CLAP audio search:** Utilizes Contrastive Language-Audio Pretraining for robust audio content retrieval.
*   **Sentence-transformer lyric search:** Employs sentence transformers for semantically understanding and matching lyrical queries.
*   **Bar-level search:** Offers granular search capabilities within musical structures, enhanced with annotation and MC filters.

In addition to the search tools, the server includes an **agentic chat endpoint**. This endpoint integrates **Claude** (specifically Claude Opus 4.6, as indicated by the co-author) to facilitate a conversational AI experience. The agent operates in a **tool loop**, meaning Claude can iteratively call available tools, process their results, and refine its understanding until a final, comprehensive text response can be generated. The system ensures type safety and predictable output through the use of **Pydantic response models** for all tool results.

## Related

[[FastMCP]],[[Claude (AI)]],[[CLAP]],[[Sentence Transformers]],[[Pydantic]],[[Agentic AI]],[[AI Tools]],[[RAG (Retrieval-Augmented Generation)]]
