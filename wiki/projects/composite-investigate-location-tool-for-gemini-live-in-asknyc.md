---
title: Composite `investigate_location` Tool for Gemini Live in askNYC
author: ai
created_at: 2026-04-13T15:36:15.816Z
last_ai_edit: 2026-04-13T15:36:15.816Z
last_human_edit: null
last_embedded_hash: 2334e1d6d6d389db
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-backend-composite-investigate-location-tool-for-reliab-a62c73.md]]"
tags:
  - gemini live
  - asknyc
  - backend
  - tooling
  - optimization
  - multi-agent
  - geocoding
  - socrata
  - api integration
  - logging
---


# Composite `investigate_location` Tool for Gemini Live in askNYC

This article details the implementation of a composite `investigate_location` tool in the [[askNYC]] project, designed to enhance the reliability of [[Gemini Live]] by consolidating multiple backend operations into a single tool call. This change addresses the limitation of [[Gemini Live]] reliably making only one tool call per turn, simplifying the multi-agent sub-delegation architecture.

## Key Concepts

Composite Tooling,Gemini Live Integration,Single Root Agent Architecture,Geocoding,Socrata Data Integration,Auto-reconnect for API Sessions,Deferred Session Start,Event Logging

## Details

The `feat(backend): composite investigate_location tool for reliable Gemini Live` commit (SHA: `f212dce`) introduced a significant architectural change to the [[askNYC]] backend. The primary motivation was to address a limitation where [[Gemini Live]] could only reliably execute one tool call per turn, leading to issues with complex multi-agent sub-delegation workflows.

The solution involved replacing the previous multi-agent sub-delegation with a single, composite `investigate_location()` tool. This new tool now encapsulates the entire process of geocoding a location, querying relevant [[Socrata datasets]], and pushing the results as data cards and map pins directly to the dashboard.

Key changes implemented as part of this feature:

*   **Flattened Agent Hierarchy**: The complex multi-agent system was streamlined to a single root agent, simplifying the control flow and interaction with [[Gemini Live]].
*   **Auto-reconnect for Gemini Live**: Implemented a mechanism to automatically reconnect [[Gemini Live]] sessions after idle timeouts, improving the system's resilience.
*   **Deferred Session Start**: To optimize API credit usage, the [[Gemini Live]] session now only starts upon the first user input, rather than at system initialization.
*   **Comprehensive Event Logging**: Enhanced event logging was added across the system to aid in debugging and monitoring the new tool's operations.

This refactor significantly improves the stability and reliability of the [[askNYC]] application when interacting with [[Gemini Live]], ensuring a smoother user experience and more efficient backend processing.

## Related

[[askNYC — Git Activity]],[[askNYC: Model Update to Gemini 2.5 Flash]],[[askNYC: Update to Gemini-Live-2.5-Flash-Native-Audio Model and Vertex AI Env Vars]],[[Backend Fix: Socrata Tool Return Types for ADK Compatibility]],[[Backend Fix: Socrata Timeout and Transcription Object Handling]],[[Backend Socrata Tool Return Type Refactor for ADK Compatibility]],[[ADK Multi-Agent Backend (askNYC Project)]],[[ADK Multi-Agent Backend for AskNYC (NYC Open Data)]],[[askNYC: 3D Map-Dominant Dashboard UI Redesign]],[[askNYC Backend: Error Handling and Logging for Silent Failures]],[[askNYC Project Documentation Overview]],[[Add Open Matter for Rahil Singhi]]
