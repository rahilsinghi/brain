---
title: MCP Server with Search Tools and Agentic Chat API in raag
author: ai
created_at: 2026-04-13T17:46:35.753Z
last_ai_edit: 2026-04-13T17:46:35.753Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-raag-feat-mcp-server-with-search-tools-and-agentic-chat-api-14a287.md]]"
tags:
  - mcp
  - server
  - api
  - agentic chat
  - claude
  - pydantic
  - search tools
  - audio search
  - lyric search
  - raag
  - llm
  - fastapi
---

# MCP Server with Search Tools and Agentic Chat API in raag

This article details the implementation of a FastMCP server within the `rahilsinghi/raag` repository, integrating seven specialized search tools and an agentic chat API. The server uses a Claude-powered tool loop to provide intelligent responses, leveraging Pydantic for robust typed tool results. It enables advanced audio and lyric searches, along with contextual song information.

## Key Concepts

FastMCP Server,Agentic Chat API,Claude LLM,Pydantic Response Models,CLAP Audio Search,Sentence-Transformer Lyric Search,Bar-Level Search

## Details

A new FastMCP (Multi-Agent Control Plane) server has been implemented within the `rahilsinghi/raag` repository (SHA: `9c7cd77`, dated `2026-03-04T00:16:57Z`, authored by Rahil Singhi with contributions from Claude Opus 4.6). This server features a comprehensive set of seven specialized tools:

*   `search_by_mood`: For discovering audio based on emotional characteristics.
*   `search_by_lyrics`: To find songs using lyrical content.
*   `search_bars`: For granular, bar-level searches, including annotation and MC filters.
*   `get_song_context`: To retrieve detailed information about a specific song.
*   `download/search YouTube audio`: For fetching and searching audio content from YouTube.

The underlying search technologies include CLAP for advanced audio searches, sentence-transformers for efficient lyric matching, and specialized logic for bar-level queries incorporating annotation and MC (Master of Ceremony) filters. The system also includes an agentic chat endpoint, powered by a Claude LLM, which orchestrates a tool loop until a final, textual response is generated. Pydantic response models ensure that all tool results are robustly typed, enhancing data integrity and developer experience. This update involved changing 7 files, adding 606 lines of code with no deletions.

## Related

[[raag]],[[Claude]],[[Pydantic]],[[Branded CLI Output and Polished MCP Tool Responses]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker]],[[Agentic Job Application System: Multi-Agent Workflow Architecture]]
