---
title: "MarkPush CLAUDE.md Updates: Device Deployment, Transport Notes, and Macro Trust Fixes"
author: ai
created_at: 2026-04-12T21:06:45.894Z
last_ai_edit: 2026-04-12T21:06:45.894Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-docs-add-device-deploy-guide-transport-notes-and-macro-t-179fd1.md]]"
tags:
  - markpush
  - documentation
  - claudemd
  - ios
  - deployment
  - xcodegen
  - tca
  - macros
  - transport
  - nodejs
  - go
  - cli
  - mcp
---

# MarkPush CLAUDE.md Updates: Device Deployment, Transport Notes, and Macro Trust Fixes

This update to the `CLAUDE.md` documentation for the [[MarkPush]] project provides crucial guidance on iOS device deployment, including a detailed walkthrough for building to device and managing macro trust after `xcodegen` regeneration. It also clarifies transport mechanisms like WiFi vs. Cloud and adds Node.js pairing commands for environments without the Go CLI.

## Key Concepts

iOS Device Deployment,Code Signing,xcodegen,The Composable Architecture (TCA) Macros,mDNS,Wireless Transport,Cloud Transport,Node.js CLI,Go CLI,MarkPush Server

## Details

This commit (`37f3379`) to the `rahilsinghi/MarkPush` repository focused on significantly enhancing the project's `CLAUDE.md` documentation. The key additions and updates include:

*   **Comprehensive iOS Device Deployment Guide**: A full walkthrough detailing the process of building and deploying the iOS application to a physical device. This includes steps for `xcode-select`, `xcodegen` setup, code signing, and establishing device trust.
*   **Macro Trust Reset Documentation**: Specific instructions on how to reset macro trust, particularly after `xcodegen` regenerations, affecting four [[TCA Macros]].
*   **Transport Mechanism Notes**: Clarification on the differences and implications of using WiFi versus Cloud transport, noting that [[mDNS]] (Multicast DNS) requires the application to be in the foreground for discovery.
*   **Node.js Pairing/Push Commands**: Provision of alternative pairing and push commands using [[Node.js]] for environments where the [[Go CLI]] might not be available or preferred.
*   **MCP Server Version and Install Commands Update**: Information on the updated MarkPush Control Plane (MCP) server version and instructions for installing it, distinguishing between global and project-scoped installations.
*   **Current Status Update**: The `CLAUDE.md` was also updated to reflect the current development status, specifically mentioning deployment to an iPhone 16 Pro Max and integration with [[Claude Code Vault Integration]].

## Related

[[MarkPush]],[[CLAUDE.md]],[[iOS Deployment]],[[xcodegen]],[[Code Signing]],[[Device Trust]],[[TCA Macros]],[[Transport Mechanisms]],[[mDNS]],[[Node.js]],[[Go CLI]],[[Claude Code Vault Integration]]
