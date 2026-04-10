---
title: MarkPush MCP Server (@markpush/mcp-server)
author: ai
created_at: 2026-04-10T02:40:07.693Z
last_ai_edit: 2026-04-10T02:40:07.693Z
last_human_edit: null
last_embedded_hash: 45d0843fb1dcc72b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-implement-mcp-server-markpush-mcp-server-77846b.md]]"
tags:
  - mcp
  - typescript
  - markpush
  - ai-tools
  - claude-code
  - encryption
  - aes-256-gcm
  - pbkdf2
  - websocket
  - mdns
  - supabase
  - npm
  - vitest
  - ios
  - markdown
  - qr-pairing
  - wifi-transport
  - cloud-transport
---


# MarkPush MCP Server (@markpush/mcp-server)

The MarkPush MCP Server is a TypeScript-based Model Context Protocol server that enables pushing AI-generated markdown content directly to an iPhone from Claude Code or any MCP-compatible terminal. It supports multiple transport mechanisms including WiFi and cloud-based delivery, and provides tools for device pairing, markdown pushing, and push history management. The server shares configuration and encryption standards with the MarkPush Go CLI and Swift iOS client.

## Key Concepts

- **Model Context Protocol (MCP):** A protocol enabling AI tools like Claude Code to expose and invoke structured tool interfaces
- **AES-256-GCM Encryption:** Symmetric authenticated encryption used to secure markdown payloads, consistent across Node.js, Go, and Swift implementations
- **PBKDF2 Key Derivation:** Password-based key derivation using SHA-256, 100,000 iterations, and a 32-byte output key for cryptographic security
- **Auto-Transport Strategy:** Attempts WiFi delivery first (2-second timeout), falling back to cloud (Supabase) if unavailable
- **mDNS Discovery:** Local network device discovery used in the WiFi WebSocket transport layer
- **QR Code Pairing:** Ephemeral HTTP server combined with terminal QR code rendering for secure device pairing
- **Prompt Templates:** Pre-built structured templates for common AI output types: code-review, meeting-notes, daily-summary, and bug-report
- **Shared Config Store:** Cross-tool configuration stored at ~/.config/markpush/, shared with the Go CLI

## Details

## Overview

Commit `3208882` (2026-03-17) by Rahil Singhi introduces the `@markpush/mcp-server` package to the `rahilsinghi/MarkPush` repository. This is a large addition of +4,430 lines across 25 files with no deletions, representing a complete new package implementation.

The server integrates with the Model Context Protocol (MCP), allowing AI assistants such as Claude Code to invoke MarkPush tools directly from the terminal without leaving the AI workflow.

---

## Available Tools

| Tool | Description |
|---|---|
| `push_markdown` | Push raw markdown content with title, tags, and source metadata |
| `push_template` | Push content using a pre-built prompt template |
| `pair_device` | Initiate QR code pairing flow to link an iPhone |
| `list_devices` | Display all currently paired devices |
| `push_history` | Retrieve recent push history from local JSON log |
| `unpair_device` | Remove a paired device from the config store |

---

## Prompt Templates

The following templates are available for structured AI output:

- **code-review** — Structured code review summary
- **meeting-notes** — Formatted meeting notes
- **daily-summary** — Daily activity or standup summary
- **bug-report** — Structured bug report

---

## Encryption & Security

The server implements the same cryptographic primitives used by the Go CLI and Swift iOS client, ensuring end-to-end compatibility:

- **Algorithm:** AES-256-GCM (authenticated encryption)
- **Key Derivation:** PBKDF2 with SHA-256, 100,000 iterations, 32-byte key output
- **Runtime:** Node.js built-in `crypto` module

This ensures that payloads encrypted by the MCP server can be decrypted by the iPhone app without any format translation.

---

## Transport Layer

### WiFi Transport
- Protocol: WebSocket
- Discovery: mDNS (local network)
- Timeout: 2 seconds before fallback

### Cloud Transport
- Provider: Supabase REST API
- Used as fallback when WiFi is unavailable

### Auto-Transport
- Tries WiFi first (2s window)
- Automatically falls back to cloud transport on failure

---

## Device Pairing

Pairing follows the same QR code flow as the Go CLI:
1. An ephemeral HTTP server is started locally
2. A QR code is rendered in the terminal using `qrcode-terminal`
3. The iPhone app scans the QR code to complete pairing
4. Device credentials are stored in `~/.config/markpush/`

---

## Configuration

The server shares its configuration directory (`~/.config/markpush/`) with the Go CLI. This means devices paired via the CLI are immediately available to the MCP server and vice versa.

Push history is stored as a local JSON file within the same config directory.

---

## Build & Distribution

- **Language:** TypeScript
- **Build Output:** Compiled to `dist/` via `tsc`
- **Distribution:** Published as an npm package with a binary entry point
- **Test Suite:** 32 passing tests using [Vitest](https://vitest.dev/), covering crypto, protocol, and template functionality

---

## Installation

To add the MarkPush MCP server to Claude Code:

```
claude mcp add markpush -- npx -y @markpush/mcp-server
```

This registers the server so Claude Code can invoke all MarkPush tools natively during AI sessions.

## Related

- [[MarkPush Go CLI]]
- [[MarkPush iOS App]]
- [[Model Context Protocol (MCP)]]
- [[AES-256-GCM Encryption]]
- [[PBKDF2 Key Derivation]]
- [[Supabase Cloud Transport]]
- [[mDNS Device Discovery]]
- [[QR Code Device Pairing]]
- [[MarkPush Shared Config Store]]
- [[Claude Code Integration]]
