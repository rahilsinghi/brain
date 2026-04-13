---
title: "MarkPush: Device Deployment Guide, Transport Notes, and Macro Trust Fix Documentation"
author: ai
created_at: 2026-04-13T17:06:29.947Z
last_ai_edit: 2026-04-13T17:06:29.947Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-docs-add-device-deploy-guide-transport-notes-and-macro-t-179fd1.md]]"
tags:
  - documentation
  - markpush
  - ios
  - deployment
  - xcode
  - codegen
  - macrotrust
  - network
  - node.js
  - mcp
  - claudecode
---

# MarkPush: Device Deployment Guide, Transport Notes, and Macro Trust Fix Documentation

This commit to the MarkPush repository updates the `CLAUDE.md` file with a comprehensive iOS device deployment guide, notes on network transport options, and a fix for macro trust issues. It also includes instructions for Node.js pairing/push commands and updates MCP server installation details, reflecting current development status with the iPhone 16 Pro Max and Claude Code MCP.

## Key Concepts

[[CLAUDE.md]] documentation updates,iOS device deployment walkthrough,Macro trust reset,WiFi vs. Cloud transport (mDNS),Node.js pairing/push commands,MCP server version and installation,[[MarkPush]] project,Xcode-select,XcodeGen,Signing and Trust (iOS),TCA macros,Claude Code MCP

## Details

This commit (`37f3379`) by Rahil Singhi on 2026-03-24 updates the `CLAUDE.md` documentation within the `rahilsinghi/MarkPush` repository. The changes include:

*   **Full iOS Build-to-Device Walkthrough**: Detailed instructions covering `xcode-select`, `codegen`, signing, and device trust for deploying MarkPush to an iOS device.
*   **Macro Trust Reset Documentation**: Added a note explaining how to reset macro trust after `codegen` regeneration, specifically addressing 4 TCA macros.
*   **Transport Notes**: Documented the differences and requirements for WiFi vs. Cloud transport, highlighting that mDNS requires the app to be in the foreground.
*   **Node.js Pairing/Push Commands**: Included instructions for using Node.js-based pairing and push commands, useful for environments where the Go CLI is not available.
*   **MCP Server Version and Install Commands**: Updated information regarding the MCP server version and clarified global vs. project-scoped installation commands.
*   **Current Status Update**: Noted the successful deployment on an iPhone 16 Pro Max and the integration of Claude Code MCP.

The update involved 87 additions and 8 deletions across one file.

## Related

[[CLAUDE.md]],[[Add CLAUDE.md for Project Context and Session Persistence]],[[MarkPush]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[Adding Dotfiles Sync Section to CLAUDE.md Documentation]],[[Branded CLI Output and Polished MCP Tool Responses]]
