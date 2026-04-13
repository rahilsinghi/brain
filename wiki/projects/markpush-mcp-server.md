---
title: MarkPush MCP Server
author: ai
created_at: 2026-04-10T21:09:19.634Z
last_ai_edit: 2026-04-10T21:09:19.634Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-implement-mcp-server-markpush-mcp-server-77846b.md]]"
tags:
  - markpush
  - mcp
  - server
  - typescript
  - ai
  - markdown
  - ios
  - iphone
  - push
  - encryption
  - websocket
  - supabase
  - cli
  - vitest
  - npm
---

# MarkPush MCP Server

The MarkPush MCP Server is a TypeScript implementation designed to push AI-generated markdown content directly to iPhones. It supports integration with Claude Code and other MCP-compatible terminals, offering various tools for content delivery, device management, and secure communication.

## Key Concepts

MCP Server,AI-generated Markdown,Secure Mobile Push,AES-256-GCM Encryption,PBKDF2 Key Derivation,WebSocket Transport,mDNS Discovery,Supabase Integration,Prompt Templates

## Details

This entry details the implementation of the MarkPush MCP (Markdown Content Push) server, a TypeScript-based application for securely pushing AI-generated markdown to iPhones.

**Repository Information:**
*   **Repo:** `rahilsinghi/MarkPush`
*   **SHA:** `3208882`
*   **Date:** `2026-03-17T01:43:05Z`
*   **Author:** Rahil Singhi
*   **Files changed:** 25
*   **Additions:** +4430
*   **Deletions:** -0

**Overview:**
The `@markpush/mcp-server` package provides a robust TypeScript server for sending AI-generated markdown content directly to iOS devices. It is designed to work seamlessly with sources like Claude Code or any other MCP-compatible terminal.

**Key Tools and Functionalities:**
*   `push_markdown`: Push raw markdown content, including title, tags, and source information.
*   `push_template`: Utilize pre-built templates for common use cases such as code reviews, meeting notes, daily summaries, and bug reports.
*   `pair_device`: Implement a secure QR code-based device pairing flow, consistent with the CLI experience.
*   `list_devices`: Display a list of currently paired devices.
*   `push_history`: Access a record of recent push operations.
*   `unpair_device`: Remove a paired device from the server's configuration.

**Supported Prompt Templates:**
*   `code-review`
*   `meeting-notes`
*   `daily-summary`
*   `bug-report`

**Infrastructure and Security:**
The server is built with a focus on security, performance, and cross-platform compatibility:
*   **Encryption:** Employs AES-256-GCM for symmetric encrypt/decrypt operations, utilizing Node.js crypto module. The encryption format is interoperable with Go and Swift implementations.
*   **Key Derivation:** PBKDF2 with SHA-256, 100,000 iterations, producing a 32-byte key for robust key derivation.
*   **Transport:**
    *   **WiFi Transport:** Leverages WebSocket for real-time communication and mDNS for local device discovery.
    *   **Cloud Transport:** Utilizes the Supabase REST API for remote communication.
    *   **Auto-transport:** Implements a WiFi-first strategy with a 2-second timeout, falling back to cloud transport if WiFi connection isn't established.
*   **Configuration:** Shares a common configuration store (`~/.config/markpush/`) with the MarkPush Go CLI for consistent settings.
*   **QR Pairing Server:** An ephemeral HTTP server combined with `qrcode-terminal` for device pairing.
*   **Push History Storage:** Stores recent push history in a local JSON file.

**Development and Deployment:**
*   **Testing:** Comprehensive test suite with 32 passing tests using Vitest, covering crypto, protocol, and template functionalities.
*   **Build Process:** TypeScript source code is compiled to `dist/` via `tsc`.
*   **Distribution:** Distributed as an npm binary.

**Installation:**
To install and use the MCP server, run the following command via the `claude mcp` CLI:
```bash
claude mcp add markpush -- npx -y @markpush/mcp-server
```

## Related

[[MarkPush]],[[Claude Code]],[[Mobile Push Notifications]],[[AES-256-GCM]],[[WebSockets]],[[Supabase]]
