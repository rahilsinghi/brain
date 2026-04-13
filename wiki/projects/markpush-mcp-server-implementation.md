---
title: MarkPush MCP Server Implementation
author: ai
created_at: 2026-04-13T18:11:34.317Z
last_ai_edit: 2026-04-13T18:11:34.317Z
last_human_edit: null
last_embedded_hash: ad11d30aed16cd07
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
  - encryption
  - websocket
  - supabase
  - cli
  - automation
  - productivity
  - network
---


# MarkPush MCP Server Implementation

This article details the implementation of the MarkPush MCP (Markdown Push) server, a TypeScript application designed to push AI-generated markdown content directly to iPhones. It supports various tools for content management, device pairing, and secure data transfer via both local WiFi and cloud infrastructure.

## Key Concepts

MCP Server,AI-generated Markdown,Secure Data Transport (AES-256-GCM, PBKDF2),WiFi and Cloud Transport Mechanisms,QR Code Device Pairing,Prompt Templates,MarkPush

## Details

The MarkPush MCP server, implemented in TypeScript, provides a robust solution for transmitting AI-generated markdown to iOS devices. It integrates seamlessly with environments like [[CLAUDE.md for Project Context and Session Persistence]] or any MCP-compatible terminal.

### Key Tools
*   `push_markdown`: For pushing raw markdown content, including title, tags, and source information.
*   `push_template`: Utilizes pre-built templates for common content types such as `code-review`, `meeting-notes`, `daily-summary`, and `bug-report`.
*   `pair_device`: Manages device pairing via a [[QR Code]] flow, identical to the CLI implementation.
*   `list_devices`: Displays all currently paired devices.
*   `push_history`: Provides access to recent push operations.
*   `unpair_device`: Removes a paired device.

### Prompt Templates
The server includes built-in prompt templates to streamline content generation and formatting:
*   `code-review`
*   `meeting-notes`
*   `daily-summary`
*   `bug-report`

### Infrastructure
The server's infrastructure emphasizes security and flexible connectivity:
*   **Encryption:** Employs AES-256-GCM encryption (Node.js crypto) compatible with Go/Swift formats.
*   **Key Derivation:** Utilizes PBKDF2 with SHA-256, 100k iterations, generating a 32-byte key.
*   **Transport:** Supports both local [[WiFi]] (via [[WebSocket]] + [[mDNS Discovery]]) and [[Cloud]] transport (using [[Supabase]] REST API).
*   **Auto-transport:** Automatically prioritizes WiFi for 2 seconds, then falls back to cloud transport if WiFi is unavailable.
*   **Configuration Store:** Shares a `~/.config/markpush/` directory with the Go CLI for consistent configuration.
*   **QR Pairing Server:** An ephemeral [[HTTP]] server combined with `qrcode-terminal` handles device pairing.
*   **Push History:** Stores local push history in a [[JSON]] file.

### Development & Build
*   **Tests:** Features 32 passing `vitest` tests covering crypto, protocol, and template functionalities.
*   **Build:** The [[TypeScript]] source is compiled to `dist/` using `tsc`, and distributed as an `npm bin`.

### Installation
To install the server, use the `claude mcp` command:
```bash
claude mcp add markpush -- npx -y @markpush/mcp-server
```

## Related

[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[CLAUDE.md for Project Context and Session Persistence]],[[AI]],[[iPhone]],[[TypeScript]],[[WebSocket]],[[Supabase]],[[mDNS Discovery]],[[QR Code]],[[WiFi]],[[Cloud]],[[HTTP]],[[JSON]]
