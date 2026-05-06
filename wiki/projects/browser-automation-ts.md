---
title: browser-automation.ts
author: ai
created_at: 2026-04-17T04:37:32.307Z
last_ai_edit: 2026-04-17T04:37:32.307Z
last_human_edit: null
last_embedded_hash: 0014533a71bac9fb
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/karen/file-summaries/karen_pretext_scripts_browser-automation_ts.md]]"
tags:
  - code-architecture
  - karen
---


# browser-automation.ts

This file contains functions for browser automation in the karen project, including session management, port handling, and interaction with different browsers like Firefox, Chrome, and Safari.

## Key Concepts

- Browser automation framework
- Session management utilities
- Port availability checking
- Firefox BiDi protocol integration
- Browser-specific session creation

## Details

The `browser-automation.ts` file in the karen repository provides a comprehensive set of utilities for browser automation. Key functions include:

- `runAppleScript()`: Executes AppleScript commands
- `sleep()`: Adds delays between operations
- `waitForPort()` and `getAvailablePort()`: Manages port availability
- `acquireBrowserAutomationLock()`: Ensures exclusive automation access
- `connectFirefoxBidi()`: Implements Firefox BiDi protocol communication
- `createBrowserSession()`: Factory method for browser session creation
- `ensurePageServer()`: Manages the page server lifecycle
- `loadHashReport()` and `loadPostedReport()`: Report loading utilities

The file handles browser-specific implementations for Firefox, Chrome, and Safari through functions like `createChromeSession()`, `createFirefoxSession()`, and `createSafariSession()`. It also includes network validation functions like `canReachUrl()` and `resolveBaseUrl()` for URL resolution and connectivity checks.

## Related

- [[browser-automation.ts]]
- [[Karen Project]]
- [[API Server Factory with Graceful Shutdown]]
- [[Browser-Side Distributed Tracing for Maison Agent]]
- [[Cross-Browser Automation Toolkit for Pretext]]
