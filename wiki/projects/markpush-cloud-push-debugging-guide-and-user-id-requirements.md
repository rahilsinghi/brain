---
title: MarkPush Cloud Push Debugging Guide and User ID Requirements
author: ai
created_at: 2026-04-13T17:35:41.343Z
last_ai_edit: 2026-04-13T17:35:41.343Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-docs-add-cloud-push-debugging-guide-and-user-id-requiremen-ed598c.md]]"
tags:
  - markpush
  - debugging
  - cloudpush
  - user_id
  - ios
  - documentation
  - cli
---

# MarkPush Cloud Push Debugging Guide and User ID Requirements

This update to the MarkPush `CLAUDE.md` documents the `user_id` NULL bug's root cause, provides a step-by-step debugging checklist, clarifies the distinction between local and npm MCP servers, and details iOS CloudReceiver logging for cloud push debugging.

## Key Concepts

user_id NULL bug,Cloud Push Debugging Checklist,Local vs. NPM MCP Server Distinction,iOS CloudReceiver Logging,Documentation

## Details

The commit `962cf8a` to the `rahilsinghi/MarkPush` repository introduces a crucial debugging guide within the `CLAUDE.md` file. This documentation addresses a recurring `user_id` NULL bug, outlining its underlying causes.

Key aspects covered include:

*   **Bug Root Cause**: Explanation of why the `user_id` might be null during cloud push operations.
*   **Debugging Checklist**: A step-by-step guide for diagnosing and resolving cloud push issues.
*   **Server Distinction**: Clarification on the operational differences between a locally run MCP (MarkPush Command Prompt) server and one installed via npm, and how this impacts debugging.
*   **iOS CloudReceiver Logging**: Specific instructions and details on how to access and interpret logs from the iOS CloudReceiver component, which is essential for troubleshooting push notification delivery on iOS devices.

## Related

[[MarkPush]],[[Add CLAUDE.md for Project Context and Session Persistence]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]]
