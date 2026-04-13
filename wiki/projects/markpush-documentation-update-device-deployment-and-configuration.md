---
title: "MarkPush Documentation Update: Device Deployment and Configuration"
author: ai
created_at: 2026-04-13T15:05:33.797Z
last_ai_edit: 2026-04-13T15:05:33.797Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-docs-add-device-deploy-guide-transport-notes-and-macro-t-179fd1.md]]"
tags:
  - documentation
  - markpush
  - ios
  - device deployment
  - codegen
  - macro trust
  - network transport
  - nodejs
  - cli
  - server
  - claude.md
---

# MarkPush Documentation Update: Device Deployment and Configuration

This update to the `CLAUDE.md` documentation for the [[MarkPush]] project details the process for iOS device deployment, addresses macro trust issues after `Xcodegen` regeneration, and provides notes on different network transport methods. It also includes commands for Node.js-based pairing and updated installation instructions for the MarkPush server.

## Key Concepts

Device Deployment,Xcode,Xcodegen,Macro Trust,Network Transport (WiFi, Cloud),mDNS,Node.js CLI,Go CLI,MarkPush Server,CLAUDE.md

## Details

This commit (`37f3379`) to the `rahilsinghi/MarkPush` repository focuses on enhancing the project's documentation, specifically within the `[[CLAUDE.md]]` file. Key additions and updates include:

*   **iOS Device Deployment Guide**: A comprehensive, step-by-step walkthrough for building and deploying the MarkPush application to iOS devices, covering `[[Xcode]]` setup, `[[Xcodegen]]` usage, code signing, and device trust management.
*   **Macro Trust Fix**: Documentation on how to reset macro trust, specifically for four [[TCA]] (The Composable Architecture) macros, which may be required after `[[Xcodegen]]` regenerates project files.
*   **Network Transport Notes**: Insights into the differences between WiFi and Cloud transport mechanisms, highlighting that `[[mDNS]]` functionality necessitates the application being in the foreground.
*   **Node.js Pairing/Push Commands**: Instructions for users to pair devices and push content using `[[Node.js]]`-based commands, catering to environments where the `[[Go CLI]]` is not available.
*   **MarkPush Server Installation**: Updates to the `[[MarkPush Server]]` version and installation procedures, clarifying global versus project-scoped installation methods.
*   **Current Status Update**: Mentions successful deployment to an [[iPhone 16 Pro Max]] and integration with `[[Claude Code]]` for the MarkPush Command Processor (MCP) functionality.

## Related

[[MarkPush]],[[Add CLAUDE.md for Project Context and Session Persistence]],[[Xcode]],[[Xcodegen]],[[TCA]],[[Macros]],[[Network Transport]],[[mDNS]],[[Node.js]],[[Go CLI]],[[MarkPush Server]],[[iPhone 16 Pro Max]],[[Claude Code]],[[Device Deployment]]
