---
title: "Documentation Update for MarkPush: iOS Deployment, Transport, and Macro Trust"
author: ai
created_at: 2026-04-10T15:04:55.573Z
last_ai_edit: 2026-04-10T15:04:55.573Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-docs-add-device-deploy-guide-transport-notes-and-macro-t-179fd1.md]]"
tags:
  - documentation
  - markpush
  - ios
  - deployment
  - xcodegen
  - macrotrust
  - tca
  - transport
  - mdns
  - nodejs
  - mcp
  - commit
  - rahilsinghi
---

# Documentation Update for MarkPush: iOS Deployment, Transport, and Macro Trust

This article summarizes a documentation update to the `CLAUDE.md` file within the MarkPush repository, focusing on a comprehensive iOS device deployment guide, notes on WiFi vs. Cloud transport, and a fix for macro trust issues after `xcodegen` regeneration. It also includes updates for Node.js pairing and MCP server installation.

## Key Concepts

iOS device deployment,Xcode-select,xcodegen,Code signing,Macro trust reset,TCA macros (The Composable Architecture),WiFi vs. Cloud transport,mDNS (multicast DNS),Node.js pairing commands,MarkPush Communication Protocol (MCP) server,Go CLI,iPhone 16 Pro Max deployment,Claude Code MCP

## Details

This documentation update, captured in commit `37f3379` by Rahil Singhi on 2026-03-24, significantly enhances the `CLAUDE.md` file within the `rahilsinghi/MarkPush` repository. Key additions and changes include:

*   **Full iOS Build-to-Device Walkthrough**: A comprehensive guide covering the entire process from building an iOS application to deploying it on a device. This includes steps for `xcode-select` configuration, using `xcodegen` for project generation, handling code signing, and establishing device trust.
*   **Macro Trust Reset Documentation**: Specific instructions were added regarding the necessity to reset macro trust, particularly for the 4 TCA macros, after regenerating Xcode projects with `xcodegen`. This addresses a common issue where regenerated projects might lose trust settings for certain macros.
*   **WiFi vs. Cloud Transport Notes**: New documentation distinguishes between WiFi and Cloud transport mechanisms for device communication. It highlights that `mDNS` (multicast DNS) for discovery requires the application to be in the foreground to function correctly, providing crucial context for developers choosing a transport method.
*   **Node.js Pairing/Push Commands**: To support environments where the Go CLI might not be available or preferred, commands for device pairing and pushing data using Node.js have been added.
*   **MCP Server Version and Install Commands Update**: The documentation now reflects the updated version of the MarkPush Communication Protocol (MCP) server. It also clarifies the installation commands, detailing options for both global and project-scoped installations.
*   **Current Status Update**: The `CLAUDE.md` file has been updated to reflect the current operational status, specifically mentioning successful deployment to an iPhone 16 Pro Max and the integration with Claude Code MCP.

## Related

[[MarkPush]],[[iOS Deployment]],[[Xcode]],[[xcodegen]],[[The Composable Architecture]],[[mDNS]],[[Node.js]],[[Go CLI]],[[MCP Server]],[[Claude Code MCP]]
