---
title: "fix(backend): Resolve WebSocket Crash and Vertex AI Connection in askNYC"
author: ai
created_at: 2026-04-10T02:12:22.427Z
last_ai_edit: 2026-04-10T02:12:22.427Z
last_human_edit: null
last_embedded_hash: d2e7e9021838fef6
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-resolve-websocket-crash-and-vertex-ai-connectio-ed1456.md]]"
tags:
  - websocket
  - vertex-ai
  - adk
  - gemini
  - backend
  - bugfix
  - session-management
  - asknyc
  - python
  - api-key
---


# fix(backend): Resolve WebSocket Crash and Vertex AI Connection in askNYC

This commit addresses several backend stability issues in the askNYC project, including a WebSocket crash caused by a missing Request parameter and Vertex AI connection problems. Key fixes include API key aliasing for ADK compatibility, session pre-creation, and a model switch to ensure availability on Vertex AI.

## Key Concepts

- **WebSocket Stability**: Fixed `dashboard_ws()` crash by removing the missing Request parameter and using a module-level session service instead
- **API Key Aliasing**: `GOOGLE_GEMINI_API_KEY` is now aliased to `GOOGLE_API_KEY` to ensure compatibility with the ADK (Agent Development Kit)
- **Session Lifecycle Management**: Added `ended_at` field to `SessionState` schema and introduced pre-creation of ADK sessions before `run_live()` to prevent 'session not found' errors
- **Model Availability**: Switched to `gemini-live-2.5-flash-native-audio`, a model confirmed available on Vertex AI

## Details

## Overview

Commit `01aae64` in the `rahilsinghi/askNYC` repository, authored by Rahil Singhi on 2026-03-28, resolves a set of critical backend issues affecting WebSocket reliability and Vertex AI connectivity.

## Changes Summary

- **Files changed:** 4
- **Additions:** +11
- **Deletions:** -5

## Fix Details

### 1. WebSocket Crash Fix
The `dashboard_ws()` function was crashing due to a missing `Request` parameter. The fix refactors the function to use a module-level session service, eliminating the dependency on the parameter and stabilizing the WebSocket connection.

### 2. API Key Aliasing for ADK Compatibility
The environment variable `GOOGLE_GEMINI_API_KEY` is now aliased to `GOOGLE_API_KEY`. This ensures that the Agent Development Kit (ADK) can locate and use the correct credentials without requiring changes to existing environment configurations.

### 3. SessionState Schema Update
A new `ended_at` field has been added to the `SessionState` schema. This enables proper tracking of session termination timestamps, improving session lifecycle observability.

### 4. ADK Session Pre-Creation
ADK sessions are now pre-created before calling `run_live()`. This prevents the runtime error where the system could not find an active session, which previously caused failures during live audio processing.

### 5. Model Switch
The backend model has been switched to `gemini-live-2.5-flash-native-audio`, which is confirmed to be available on the Vertex AI platform, replacing a model that was causing availability or compatibility issues.

## Related

- [[askNYC Project]]
- [[Vertex AI Integration]]
- [[Google Agent Development Kit (ADK)]]
- [[WebSocket Backend Architecture]]
- [[SessionState Schema]]
- [[Gemini Live Audio Models]]
- [[Google API Key Management]]
