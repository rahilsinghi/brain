---
title: FastMCP Server with Agentic Chat API and Search Tools
author: ai
created_at: 2026-04-12T18:19:43.381Z
last_ai_edit: 2026-04-12T18:19:43.381Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-mcp-server-with-search-tools-and-agentic-chat-api-14a287.md]]"
tags:
  - mcp server
  - raag
  - agentic chat
  - api
  - search tools
  - claude
  - llm
  - tool use
  - pydantic
  - clap
  - sentence transformer
  - lyrics search
  - audio search
  - backend
---

# FastMCP Server with Agentic Chat API and Search Tools

This commit introduces the FastMCP server within the [[raag]] repository, featuring a comprehensive set of seven search and utility tools. It integrates an agentic chat API powered by [[Claude]], enabling dynamic tool-use loops to generate final text responses. The system leverages [[Pydantic]] models for robust, typed tool result handling.

## Key Concepts

FastMCP Server,Agentic Chat API,LLM Tool Use,Search Tools,CLAP Audio Search,Sentence-Transformer Lyric Search,Bar-Level Search,Pydantic Response Models

## Details

This commit introduces the FastMCP server within the `[[raag]]` repository, enhancing its capabilities with advanced search tools and an agentic chat [[API]].

### Key Features:

*   **FastMCP Server**: The core component integrated into the `[[raag]]` project, designed for efficient media content processing.
*   **Comprehensive Toolset**: The server exposes seven distinct tools to facilitate various search and utility operations:
    *   `search_by_mood`: For discovering content based on emotional or sonic characteristics.
    *   `search_by_lyrics`: To find content using lyrical phrases or themes.
    *   `search_bars`: For granular musical analysis, targeting specific bars within a track.
    *   `get_song_context`: To retrieve detailed information about a song.
    *   `download/search YouTube audio`: For fetching audio content directly from YouTube.
*   **Advanced Search Capabilities**: The system integrates specialized search mechanisms:
    *   [[CLAP Embeddings|CLAP audio search]] for highly contextual and mood-based audio queries.
    *   [[Sentence-Transformer]] lyric search, enabling semantic matching beyond keyword-based approaches.
    *   Bar-level search, which includes options for filtering by annotations and MC (master of ceremonies) presence, offering detailed musical insight.
*   **Agentic Chat API**: Powered by `[[Claude]]`, this API orchestrates a sophisticated tool-use loop. The agent dynamically selects and executes the most appropriate tools based on user queries, iteratively refining its approach until a final, coherent text response is generated.
*   **Typed Tool Results**: The implementation utilizes [[Pydantic]] response models to ensure all tool outputs are type-safe and validated, promoting data integrity and a streamlined development experience.

## Related

[[raag]],[[Claude]],[[Pydantic]],[[Agentic Chat System]],[[API]],[[CLAP Embeddings]],[[Sentence-Transformer]],[[Chat History Feature (raag)]],[[Cloud-powered Word-Level Rhyme Annotator for Raag]]
