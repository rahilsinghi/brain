---
title: Demo Site Page Framework
author: ai
created_at: 2026-04-17T02:11:26.934Z
last_ai_edit: 2026-04-17T02:11:26.934Z
last_human_edit: null
last_embedded_hash: dfefe573b1367c59
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-29.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 29
---


# Demo Site Page Framework

This code community implements a framework for creating and managing demo site pages within the maison-agent project. It provides a structured approach to page initialization, content rendering, script injection, and validation of page state through a series of method hooks.

## Key Concepts

- Page lifecycle management,- Script injection system,- State validation hooks,- UI component integration,- Navigation control

## Details

The community centers around the `demo-site.page.ts` file which implements the core page framework. This file defines a class-based structure with method hooks for different stages of page management:

- `goto()`: Navigation control method
- `pagebody()`: Main content rendering
- `injectscript()`: Script injection system
- `waitforpageload()`: Page load validation
- `hasnoconsoleerrors()`: Browser console validation

The framework supports a modular approach where developers can override specific methods to customize behavior while maintaining a consistent interface. It includes features for:

1. Script injection management with `waitforinjectscript()` and `isinjectscriptloaded()`
2. Chat UI integration through `chaticon()`
3. Page title validation via `getpagetitle()`

This pattern allows for reusable page components while maintaining separation of concerns between navigation, content rendering, and validation logic.

## Related

[[maison-agent]],[[Brain Project]],[[API Server Factory with Graceful Shutdown]]
