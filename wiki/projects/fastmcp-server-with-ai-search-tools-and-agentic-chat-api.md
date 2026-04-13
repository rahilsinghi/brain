---
title: FastMCP Server with AI Search Tools and Agentic Chat API
author: ai
created_at: 2026-04-10T17:39:35.258Z
last_ai_edit: 2026-04-10T17:39:35.258Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-mcp-server-with-search-tools-and-agentic-chat-api-14a287.md]]"
tags:
  - fastmcp
  - server
  - ai
  - search
  - agentic
  - chatgpt
  - claude
  - llm
  - tool-use
  - audio
  - music
  - nlp
  - pydantic
---

# FastMCP Server with AI Search Tools and Agentic Chat API

This entry describes a FastMCP server implementation that integrates seven specialized search tools for music and audio, leveraging advanced AI models like CLAP and sentence transformers. It also features an agentic chat endpoint powered by Claude, designed to loop through tool interactions until a final textual response is generated.

## Key Concepts

FastMCP server,Agentic AI,Large Language Models (LLM),Tool-use (LLM),Semantic Search,Audio Search (CLAP),Lyric Search (Sentence Transformers),Pydantic

## Details

The `raag` repository, specifically commit `9c7cd77` by Rahil Singhi (with co-authorship from Claude Opus 4.6) on 2026-03-04, introduces a FastMCP server equipped with a suite of sophisticated search and interaction capabilities.

**Server Capabilities and Tools:**
This FastMCP server provides access to seven distinct tools designed for comprehensive music and audio exploration:
*   `search_by_mood`: Allows users to find audio based on emotional or thematic queries.
*   `search_by_lyrics`: Facilitates searching for songs using specific lyrical content.
*   `search_bars`: Provides bar-level search functionality, potentially useful for music production or analysis, with filters for annotations or MCs.
*   `get_song_context`: Retrieves detailed information about a given song.
*   `download/search YouTube audio`: Enables searching for and downloading audio from YouTube.

**Underlying Search Technologies:**
The various search tools leverage state-of-the-art AI models:
*   **CLAP audio search:** Utilized for advanced audio content search, likely enabling multimodal or semantic audio queries.
*   **Sentence-transformer lyric search:** Powers the lyric-based search, providing semantic understanding of lyrical content.
*   **Bar-level search:** This unique feature offers granular search within audio, enhanced by annotation and MC (Master of Ceremonies/rapper) filters.

**Agentic Chat Endpoint:**
The server includes an agentic chat endpoint, which integrates the Claude LLM. This endpoint operates on a 'tool loop' mechanism: Claude interprets user queries, decides which of the available tools to use, executes them, processes the results, and potentially reiterates this process until a complete and satisfactory textual response can be formulated and returned to the user.

**Technical Implementation:**
To ensure data integrity and facilitate robust development, the server utilizes Pydantic response models. This enforces type-hinting and validation for the results returned by the various tools, contributing to a more reliable and maintainable API.

## Related

[[FastMCP]],[[Agentic AI]],[[Large Language Models (LLM)]],[[Claude]],[[Pydantic]],[[Semantic Search]],[[Audio Information Retrieval]]
