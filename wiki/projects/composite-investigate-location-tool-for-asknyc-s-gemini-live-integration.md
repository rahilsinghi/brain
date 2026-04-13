---
title: Composite `investigate_location` Tool for askNYC's Gemini Live Integration
author: ai
created_at: 2026-04-12T21:24:22.163Z
last_ai_edit: 2026-04-12T21:24:22.163Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-backend-composite-investigate-location-tool-for-reliab-a62c73.md]]"
tags:
  - asknyc
  - backend
  - geminilive
  - tooling
  - geocoding
  - socrata
  - api
  - optimization
  - logging
  - agentic
---

# Composite `investigate_location` Tool for askNYC's Gemini Live Integration

This commit introduces a composite `investigate_location` tool for the [[askNYC]] backend, enhancing the reliability of [[Gemini Live]]'s tool calling by consolidating multiple steps into a single, comprehensive operation. It replaces a multi-agent sub-delegation approach with a streamlined workflow that handles geocoding, Socrata data queries, and dashboard updates in one go. Additionally, the update includes auto-reconnect functionality for Gemini Live, defers session start to optimize API credit usage, and adds extensive event logging for debugging.

## Key Concepts

Composite Tooling,[[Gemini Live]],Tool Calling,Geocoding,Socrata Data Integration,Agent Hierarchy Flattening,API Credit Optimization,Event Logging,Session Management

## Details

This significant backend update for the [[askNYC]] project (commit `f212dce` in `rahilsinghi/askNYC`) focuses on improving the robustness and efficiency of interactions with [[Gemini Live]].

**Key Changes:**

*   **Composite `investigate_location()` Tool:** The core change involves replacing a multi-agent sub-delegation strategy with a single, composite `investigate_location()` tool. This is crucial because [[Gemini Live]] is most reliable when making only one tool call per turn. The new tool encapsulates several functionalities:
    *   **Geocoding:** It handles the process of converting location descriptions into geographical coordinates.
    *   **Socrata Data Querying:** It queries relevant [[Socrata datasets]] based on the identified location.
    *   **Dashboard Updates:** It pushes processed data cards and map pins directly to the [[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI]].
*   **Flattened Agent Hierarchy:** The previous multi-agent structure was simplified, with the responsibilities now consolidated under a single root agent for better control and reliability.
*   **Gemini Live Auto-Reconnect:** An auto-reconnect mechanism was implemented to gracefully handle [[Gemini Live]] idle timeouts, improving user experience and system resilience.
*   **Deferred Session Start:** To optimize [[API credits]] usage, the session start is now deferred until the first user input is received.
*   **Comprehensive Event Logging:** Detailed event logging has been added across the system, which is invaluable for debugging and monitoring the new integrated workflow.

## Related

[[askNYC — Git Activity]],[[Backend Core Implementation: FastAPI, Pydantic, and Docker]],[[Gemini Provider with Dual-Key Rotation and Auto-Fallback]],[[askNYC: Model Update to Gemini 2.5 Flash]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[CLAUDE.md Update: Composite Tool Architecture and Session Persistence in askNYC]],[[ADK Multi-Agent Backend for AskNYC (NYC Open Data)]],[[askNYC: Next.js 15 Dashboard with Real-time WebSocket UI]]
