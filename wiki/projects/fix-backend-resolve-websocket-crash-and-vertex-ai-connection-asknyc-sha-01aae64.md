---
title: "fix(backend): resolve WebSocket crash and Vertex AI connection – askNYC (SHA 01aae64)"
author: ai
created_at: 2026-04-10T02:12:25.170Z
last_ai_edit: 2026-04-10T02:12:25.170Z
last_human_edit: null
last_embedded_hash: 78686ae3485564e4
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-asknyc-fix-backend-resolve-websocket-crash-and-vertex-ai-connectio-ed1456.md]]"
tags:
  - websocket
  - vertex-ai
  - google-adk
  - gemini
  - session-management
  - bug-fix
  - backend
  - asknyc
  - python
  - api-key
---


# fix(backend): resolve WebSocket crash and Vertex AI connection – askNYC (SHA 01aae64)

This commit by Rahil Singhi addresses a set of backend stability issues in the askNYC project, including a WebSocket crash caused by a missing Request parameter, Vertex AI connection failures, and session management bugs. The fix also updates the model target to gemini-live-2.5-flash-native-audio and aligns API key naming for ADK compatibility. Four files were changed with 11 additions and 5 deletions.

## Key Concepts

- **WebSocket stability**: Fixed `dashboard_ws()` crash by removing the missing `Request` parameter dependency and switching to a module-level session service
- **Vertex AI / ADK compatibility**: Aliased `GOOGLE_GEMINI_API_KEY` to `GOOGLE_API_KEY` to satisfy ADK's expected environment variable naming
- **Session lifecycle management**: Added `ended_at` field to `SessionState` schema and pre-creates ADK sessions before calling `run_live()` to prevent 'session not found' errors
- **Model selection**: Switched to `gemini-live-2.5-flash-native-audio`, which is available on Vertex AI

## Details

## Overview

Commit `01aae64` (2026-03-28) resolves several interconnected backend issues in the [askNYC](https://github.com/rahilsinghi/askNYC) project that caused WebSocket crashes and blocked Vertex AI / Google ADK connectivity.

## Changes

### 1. WebSocket Crash Fix (`dashboard_ws()`)
The `dashboard_ws()` handler was failing due to a missing `Request` parameter in its signature. The fix removes this dependency and delegates session management to a module-level session service, making the handler more resilient and decoupled.

### 2. API Key Aliasing for ADK Compatibility
Google's Agent Development Kit (ADK) expects the API key to be stored in the environment variable `GOOGLE_API_KEY`. The project was using `GOOGLE_GEMINI_API_KEY`, causing silent authentication failures. The fix introduces an alias so both names resolve correctly.

### 3. SessionState Schema Update
A new `ended_at` field was added to the `SessionState` schema to properly track session termination timestamps. This is a prerequisite for accurate session lifecycle tracking and auditing.

### 4. Pre-creation of ADK Sessions
Previously, `run_live()` was called before the corresponding ADK session existed, resulting in a 'session not found' runtime error. The fix ensures the ADK session is created ahead of `run_live()` invocation.

### 5. Model Update
The model identifier was updated to `gemini-live-2.5-flash-native-audio`, which is supported on Vertex AI. The previous model was either unavailable or unsupported in the Vertex AI environment.

## Diff Summary

| Metric | Value |
|---|---|
| Files changed | 4 |
| Additions | +11 |
| Deletions | -5 |
| Net change | +6 lines |

## Related

- [[askNYC Project]]
- [[Vertex AI Integration]]
- [[Google ADK (Agent Development Kit)]]
- [[WebSocket Backend Architecture]]
- [[SessionState Schema]]
- [[Gemini Live Models]]
- [[Rahil Singhi]]
