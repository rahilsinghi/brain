---
title: MCP Server Implementation for MarkPush
author: ai
created_at: 2026-04-11T00:10:57.522Z
last_ai_edit: 2026-04-11T00:10:57.522Z
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
  - iphone
  - claude
  - encryption
  - websocket
  - supabase
  - cli
  - rahil singhi
---

# MCP Server Implementation for MarkPush

This article details the implementation of the TypeScript-based MCP (Markdown Communication Protocol) server for the MarkPush project. It enables pushing AI-generated markdown content directly to iPhones from Claude Code or any MCP-compatible terminal. The server supports various tools like pushing raw markdown, using templates, device pairing, and secure, multi-transport communication.

## Key Concepts

MCP (Markdown Communication Protocol),AI-generated Markdown,Device Pairing (QR Code),AES-256-GCM Encryption,PBKDF2 Key Derivation,WebSocket Transport,mDNS Discovery,Supabase REST API,Auto-transport Fallback (WiFi/Cloud),Config Store,Push History

## Details

The `feat: implement MCP server (@markpush/mcp-server)` commit (SHA: `3208882`) by Rahil Singhi on 2026-03-17 introduced a TypeScript-based MCP server within the `rahilsinghi/MarkPush` repository. This server facilitates the direct push of AI-generated markdown content to iPhones from either Claude Code or other MCP-compatible terminals.

### Key Tools
The server provides the following functionalities:
*   **`push_markdown`**: For pushing raw markdown content, including title, tags, and source information.
*   **`push_template`**: Utilizes pre-built templates for common content types such as `code-review`, `meeting-notes`, `daily-summary`, and `bug-report`.
*   **`pair_device`**: Implements a QR code-based device pairing flow, consistent with the CLI version.
*   **`list_devices`**: Displays a list of currently paired devices.
*   **`push_history`**: Provides access to recent push operations.
*   **`unpair_device`**: Allows for the removal of previously paired devices.

### Prompt Templates
Built-in templates include:
*   `code-review`
*   `meeting-notes`
*   `daily-summary`
*   `bug-report`

### Infrastructure & Security
*   **Encryption**: Employs AES-256-GCM encryption/decryption using Node.js crypto, ensuring compatibility with Go/Swift implementations.
*   **Key Derivation**: Uses PBKDF2 with SHA-256, 100k iterations, and a 32-byte key for secure key derivation.
*   **Transport**: Supports multiple transport layers:
    *   **WiFi Transport**: Utilizes WebSocket and mDNS discovery for local network communication.
    *   **Cloud Transport**: Leverages the Supabase REST API for remote communication.
    *   **Auto-transport**: Implements a `WiFi first` strategy with a 2-second timeout before falling back to cloud transport.
*   **Config Store**: Shares a configuration directory (`~/.config/markpush/`) with the existing Go CLI.
*   **QR Pairing Server**: An ephemeral HTTP server with `qrcode-terminal` for the pairing process.
*   **Push History**: Stores push history in a local JSON file.

### Testing and Build
*   **Tests**: The implementation includes 32 passing `vitest` tests covering crypto, protocol, and template functionalities.
*   **Build**: TypeScript source code is compiled to `dist/` via `tsc` and distributed as an npm bin.

### Installation
The server can be installed via the Claude CLI using the command: `claude mcp add markpush -- npx -y @markpush/mcp-server`.

## Related

[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[Chore: Remove Implementation Plan from MarkPush Repository]],[[CLAUDE.md for Claude Code Vault Integration]],[[Commit e4c9e16: MarkPush Project Screenshots]],[[Commit: Add MarkPush Project Screenshots]],[[Documentation for MarkPush MCP Server Plan and System Architecture]],[[Documentation Update: CLAUDE.md in MarkPush]],[[Documentation Update: Device Deployment, Transport Notes, and Macro Trust (MarkPush, CLAUDE.md)]],[[FastMCP Server with AI Search Tools and Agentic Chat API]],[[FastMCP Server with Search Tools and Agentic Chat API]],[[Claude Code Vault Integration Documentation]]
