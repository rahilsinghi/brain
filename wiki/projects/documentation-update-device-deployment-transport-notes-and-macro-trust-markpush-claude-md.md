---
title: "Documentation Update: Device Deployment, Transport Notes, and Macro Trust (MarkPush, CLAUDE.md)"
author: ai
created_at: 2026-04-11T00:05:47.152Z
last_ai_edit: 2026-04-11T00:05:47.152Z
last_human_edit: null
last_embedded_hash: 0d9b42ab016ac90c
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-docs-add-device-deploy-guide-transport-notes-and-macro-t-179fd1.md]]"
tags:
  - documentation
  - ios
  - deployment
  - markpush
  - claudemd
  - transport
  - macrotrust
  - xcodegen
  - tca
  - mcp
---


# Documentation Update: Device Deployment, Transport Notes, and Macro Trust (MarkPush, CLAUDE.md)

This commit updates the `CLAUDE.md` documentation within the `MarkPush` repository, focusing on comprehensive guides for iOS device deployment, transport mechanisms, and macro trust management. It provides essential instructions for building, signing, and deploying the application, alongside notes on network transport and MCP server updates.

## Key Concepts

[[iOS Deployment]],[[Code Signing]],[[Macro Trust]],[[mDNS]],[[MCP Server]],[[TCA Macros]],[[Node.js Pairing Commands]],[[Go CLI]]

## Details

This documentation update, captured in commit `37f3379` within the [[MarkPush]] repository, provides crucial details for developers working on the project. Key additions to [[CLAUDE.md]] include:

*   **iOS Build-to-Device Walkthrough**: A complete guide covering the entire process of building and deploying the MarkPush application to an iOS device. This includes steps for `xcode-select` configuration, `xcodegen` usage, application signing, and establishing device trust.
*   **Macro Trust Reset Documentation**: Instructions on how to reset macro trust, specifically after regenerating `xcodegen` files. This is particularly important for the 4 [[TCA Macros]] used in the project.
*   **Transport Notes**: Information regarding different transport mechanisms, contrasting `WiFi` (which utilizes [[mDNS]] and requires the app to be in the foreground) with `Cloud` transport options.
*   **Node.js Pairing/Push Commands**: Inclusion of `Node.js` based commands for device pairing and pushing data, catering to environments where the [[Go CLI]] might not be available or preferred.
*   **MCP Server Updates**: Updated instructions for installing and managing the [[MCP Server]], clarifying the differences between global and project-scoped installations and providing the current server version.

The update also notes the successful deployment on an [[iPhone 16 Pro Max]] and mentions the integration of [[Claude Code MCP]], reflecting the current status and capabilities of the project's deployment pipeline.

## Related

[[MarkPush]],[[CLAUDE.md]],[[Documentation Update for MarkPush: iOS Deployment, Transport, and Macro Trust]],[[Documentation Update: CLAUDE.md in MarkPush]],[[Documentation Update: Device Deployment, Transport Notes, and Macro Trust (MarkPush, CLAUDE.md)]],[[FastMCP Server with AI Search Tools and Agentic Chat API]],[[Documentation Update for MarkPush: iOS Deployment, Transport, and Macro Trust]]
