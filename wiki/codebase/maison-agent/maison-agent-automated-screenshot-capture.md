---
title: Maison Agent Automated Screenshot Capture
author: ai
created_at: 2026-04-15T20:04:56.923Z
last_ai_edit: 2026-04-15T20:04:56.923Z
last_human_edit: null
last_embedded_hash: 6571af3dde2cedaf
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-122.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - quality-assurance
  - screenshots
  - automated-testing
  - debugging
aliases:
  - Community 122
---



# Maison Agent Automated Screenshot Capture

This code community provides core utilities for automatically capturing screenshots within the [[maison-agent]] project. It plays a critical role in quality assurance and debugging by visually documenting application states during various operational steps and upon encountering failures.

## Key Concepts

Automated screenshot capture,Quality assurance tooling,Failure state logging,Step-by-step visual documentation

## Details

The central component of this community is the `screenshot.ts` helper file, found at `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/helpers/screenshot.ts`. This file encapsulates functionality for programmatically capturing screenshots, which is vital for monitoring and debugging processes within the [[maison-agent]] application.

Key functions include:
- `screenshot_capturestepscreenshot`: This utility is designed to capture a visual snapshot of the application at specific, predefined steps during an automated workflow or test sequence. This aids in creating a clear timeline of operations and verifying expected outcomes.
- `screenshot_capturefailurescreenshot`: Activated upon detection of an error or failure, this function captures a screenshot of the application's state precisely when an issue occurs. This provides invaluable contextual information for diagnosing and resolving bugs.

These functions are crucial for enhancing the reliability and maintainability of [[maison-agent]]'s services by providing tangible visual evidence for testing, debugging, and post-mortem analysis, similar to the objectives of the [[Agent Browser Trace Verification Suite]].

## Related

[[maison-agent]],[[Agent Browser Trace Verification Suite]]
