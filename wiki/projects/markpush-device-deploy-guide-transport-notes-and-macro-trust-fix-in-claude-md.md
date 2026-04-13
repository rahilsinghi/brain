---
title: "MarkPush: Device Deploy Guide, Transport Notes, and Macro Trust Fix in CLAUDE.md"
author: ai
created_at: 2026-04-12T17:05:59.865Z
last_ai_edit: 2026-04-12T17:05:59.865Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-docs-add-device-deploy-guide-transport-notes-and-macro-t-179fd1.md]]"
tags:
  - markpush
  - documentation
  - ios
  - deployment
  - xcode
  - macro
  - trust
  - transport
  - cli
  - nodejs
  - claude.md
---

# MarkPush: Device Deploy Guide, Transport Notes, and Macro Trust Fix in CLAUDE.md

This article details documentation updates made to the `CLAUDE.md` file within the [[MarkPush]] repository. It includes a comprehensive guide for deploying to iOS devices, notes on WiFi versus Cloud transport mechanisms, and instructions for resolving macro trust issues after Xcode project generation. These updates enhance the developer experience for configuring and deploying the [[MarkPush]] application.

## Key Concepts

iOS Deployment,Xcode Project Generation,Macro Trust,mDNS (Multicast DNS),WiFi Transport,Cloud Transport,Node.js Pairing,MarkPush CLI,CLAUDE.md Documentation

## Details

The `CLAUDE.md` file in the [[MarkPush]] repository was updated with critical documentation regarding device deployment, transport considerations, and macro trust issues. This commit, `37f3379`, by Rahil Singhi on 2026-03-24, significantly improves the setup and troubleshooting process for developers working on the project.

Key additions include:

*   **Full iOS Build-to-Device Walkthrough**: A step-by-step guide covering the entire process from using `xcode-select` and `xcodegen` to managing signing identities and device trust for iOS deployments.
*   **Macro Trust Reset Documentation**: Instructions on how to reset macro trust, specifically addressing four [[TCA]] (Composable Architecture) macros that may require re-trusting after `xcodegen` regeneration. This is crucial for ensuring proper functioning of the application.
*   **WiFi vs. Cloud Transport Notes**: Detailed explanations and considerations for using different transport mechanisms. It highlights that [[mDNS]] (Multicast DNS) functionality requires the application to be in the foreground, providing important context for debugging and deployment strategies.
*   **Node.js Pairing/Push Commands**: Documentation of commands for pairing and pushing data using Node.js, specifically catering to environments where the Go CLI might not be available or preferred.
*   **MCP Server Version and Install Commands Update**: Information on the latest [[MarkPush]] Control Panel (MCP) server version and updated installation commands, clarifying whether to install globally or project-scoped.
*   **Current Status Update**: An update reflecting the successful deployment to an iPhone 16 Pro Max and current work involving Claude Code MCP, indicating active development and testing.

## Related

[[MarkPush]],[[CLAUDE.md Update: E2E Findings, Transport Decisions, and npm Publish Status in MarkPush]],[[CLAUDE.md for Claude Code Vault Integration]],[[Xcode]],[[mDNS]]
