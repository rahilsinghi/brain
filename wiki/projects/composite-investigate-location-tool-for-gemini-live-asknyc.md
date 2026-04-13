---
title: Composite `investigate_location` Tool for Gemini Live (askNYC)
author: ai
created_at: 2026-04-11T00:16:22.951Z
last_ai_edit: 2026-04-11T00:16:22.951Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-backend-composite-investigate-location-tool-for-reliab-a62c73.md]]"
tags:
  - asknyc
  - gemini live
  - backend
  - tooling
  - multi-agent
  - optimization
  - api
  - socrata
  - geocoding
  - system architecture
---

# Composite `investigate_location` Tool for Gemini Live (askNYC)

This update to the `rahilsinghi/askNYC` project introduces a composite `investigate_location` tool to overcome Gemini Live's limitation of reliably making only one tool call per turn. It consolidates geocoding, Socrata data queries, and dashboard updates into a single function, thereby flattening the agent hierarchy. The change also includes auto-reconnect for idle timeouts, deferred session start to optimize API credit usage, and comprehensive event logging.

## Key Concepts

[[Gemini Live]],Tool calls,Multi-agent systems,Geocoding,Socrata datasets,API credit optimization,Event logging,Session management

## Details

The `rahilsinghi/askNYC` project received an important update (SHA `f212dce`) focused on optimizing interactions with `Gemini Live`. The primary challenge addressed was Gemini Live's inherent limitation of reliably executing only a single tool call per turn, which previously necessitated complex multi-agent sub-delegation for tasks involving multiple steps.

To resolve this, a new **composite `investigate_location()` tool** was introduced. This single tool integrates several functionalities:
*   **Geocoding**: Translating location names into geographical coordinates.
*   **Socrata Data Queries**: Interfacing with relevant Socrata datasets to retrieve information.
*   **Dashboard Updates**: Pushing data cards and map pins directly to the `askNYC` dashboard.

This consolidation flattens the agent hierarchy, streamlining the root agent's responsibilities and improving reliability. Beyond the composite tool, the update also includes several system enhancements:
*   **Auto-reconnect**: Implemented for `Gemini Live` to handle idle timeouts gracefully.
*   **Deferred Session Start**: The session now initiates only upon the first user input, leading to significant savings in API credits.
*   **Comprehensive Event Logging**: Enhanced logging capabilities have been added to aid in debugging and monitoring system behavior.

## Related

[[askNYC]],[[Composite `investigate_location` Tool for Gemini Live]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[ADK Multi-Agent Backend (askNYC Project)]],[[Backend Fix: Socrata Timeout and Transcription Object Handling (askNYC)]],[[Dashboard Feature: Floating Data Cards Panel with Staggered Animations]]
