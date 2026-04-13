---
title: Composite `investigate_location` Tool for askNYC Backend
author: ai
created_at: 2026-04-13T17:14:48.338Z
last_ai_edit: 2026-04-13T17:14:48.338Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-feat-backend-composite-investigate-location-tool-for-reliab-a62c73.md]]"
tags:
  - asknyc
  - backend
  - gemini-live
  - tooling
  - api
  - optimization
  - socrata
  - geocoding
  - multi-agent
  - logging
---

# Composite `investigate_location` Tool for askNYC Backend

This update introduces a composite `investigate_location` tool for the askNYC backend, consolidating multiple agent sub-delegations into a single, reliable call for Gemini Live. This new tool handles geocoding, Socrata data queries, and dashboard updates, improving efficiency and stability.

## Key Concepts

[[Gemini Live]],[[Tooling]],[[Geocoding]],[[Socrata]],[[Multi-Agent Systems]],[[API Optimization]],[[Event Logging]]

## Details

The `askNYC` backend was refactored to address Gemini Live's limitation of reliably making only one tool call per turn. This change replaces a complex multi-agent sub-delegation hierarchy with a single, composite `investigate_location()` tool.

This consolidated tool performs several actions in one shot:
*   **Geocoding**: Converts location descriptions into geographical coordinates.
*   **Socrata Data Query**: Queries relevant Socrata datasets based on the geocoded location.
*   **Dashboard Updates**: Pushes data cards and map pins to the `askNYC` dashboard.

Key changes implemented alongside this new tool include:
*   **Flattened Agent Hierarchy**: The previous multi-agent structure was simplified to a single root agent.
*   **Auto-Reconnect for Gemini Live**: Added functionality to automatically reconnect in case of Gemini Live idle timeouts.
*   **Deferred Session Start**: Session initiation is now deferred until the first user input, optimizing `API credits` usage.
*   **Comprehensive Event Logging**: Enhanced event logging was added to facilitate debugging and monitoring.

## Related

[[askNYC — Git Activity]],[[Backend Fix: Socrata Tool Return Types for ADK Compatibility]],[[ADK Multi-Agent Backend for AskNYC (NYC Open Data)]],[[askNYC: Model Update to Gemini-2.5-Flash-Native-Audio-Latest]],[[askNYC Backend Hardening (ad6b409)]],[[askNYC: Functional Splash Page, Dashboard Query Params, and Settings Panel]]
