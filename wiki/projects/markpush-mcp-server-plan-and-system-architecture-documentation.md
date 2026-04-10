---
title: MarkPush MCP Server Plan and System Architecture Documentation
author: ai
created_at: 2026-04-10T02:57:46.572Z
last_ai_edit: 2026-04-10T02:57:46.572Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-docs-add-mcp-server-plan-and-system-architecture-diagrams-ce0956.md]]"
tags:
  - markpush
  - mcp
  - typescript
  - architecture
  - documentation
  - ios
  - tca
  - encryption
  - cloud-relay
  - device-pairing
  - npm-package
  - system-design
  - rahil-singhi
---

# MarkPush MCP Server Plan and System Architecture Documentation

This commit adds comprehensive documentation for the MarkPush project, including a full implementation plan for the @markpush/mcp-server TypeScript npm package and detailed system architecture diagrams. The documentation covers MCP tools, protocol message flows, device pairing sequences, encryption formats, and the iOS TCA architecture. CLAUDE.md was also updated to reflect the new MCP context and documentation index.

## Key Concepts

- **MCP Server (@markpush/mcp-server):** A TypeScript npm package providing MCP (Model Context Protocol) tools for pushing markdown content and managing devices
- **MCP Tools:** Defined operations including `push_markdown`, `push_template`, `pair_device`, `list_devices`, and `push_history`
- **Prompt Templates:** Reusable MCP prompt definitions bundled with the server package
- **Shared Config:** Configuration layer shared between the MCP server and the MarkPush CLI
- **System Architecture Diagrams:** Visual representations of the full system overview, protocol message flow, pairing sequence, and transport selection logic
- **Pairing Sequence:** The protocol flow used to authenticate and register devices with MarkPush
- **Encryption Format:** The data encryption scheme used to secure markdown content in transit
- **Transport Selection:** Logic for choosing between direct and cloud relay transport paths
- **iOS TCA Architecture:** The The Composable Architecture (TCA) pattern used in the MarkPush iOS client
- **Cloud Relay Schema:** The data schema and design of the cloud relay component used for indirect device communication
- **Security Model:** The overarching security design governing device trust, encryption, and access control

## Details

## Overview

Commit `4f7aabb` by Rahil Singhi (2026-03-17) adds **701 lines** of new documentation across three files in the [rahilsinghi/MarkPush](https://github.com/rahilsinghi/MarkPush) repository. This represents a major documentation milestone capturing the MCP server design and the full system architecture.

---

## Files Changed

### `docs/mcp-server-plan.md` (new)
A full implementation plan for the `@markpush/mcp-server` TypeScript npm package. Key sections include:

- **MCP Tools:**
  - `push_markdown` — Push a markdown document to a paired device
  - `push_template` — Push a named template to a device
  - `pair_device` — Initiate or complete a device pairing flow
  - `list_devices` — Enumerate currently paired and available devices
  - `push_history` — Retrieve a history of previously pushed content
- **Prompt Templates:** Bundled prompt definitions for use in MCP-compatible clients
- **Shared Config:** A configuration module shared between `@markpush/mcp-server` and the MarkPush CLI to ensure consistent behavior and credentials

### `docs/system-architecture.md` (new)
Comprehensive system-wide architecture documentation including diagrams for:

- **Full System Overview:** High-level diagram of all MarkPush components and their relationships
- **Protocol Message Flow:** Sequence and structure of messages exchanged between components
- **Pairing Sequence:** Step-by-step flow for pairing a new device, including handshake and credential exchange
- **Encryption Format:** Description of the encryption scheme applied to markdown payloads in transit
- **Transport Selection:** Decision logic for choosing between direct peer-to-peer transport and cloud relay
- **iOS TCA Architecture:** How The Composable Architecture (TCA) is applied in the MarkPush iOS app, including state, actions, reducers, and effects
- **Cloud Relay Schema:** Database and API schema for the cloud relay service that facilitates indirect device communication
- **Security Model:** End-to-end security design covering device trust, key management, and access control policies

### `CLAUDE.md` (updated)
- Added MCP context to help AI assistants understand the project's MCP server component
- Added a **key docs index** linking to the new architecture and plan documents
- Updated **current status** section to reflect documentation progress

---

## Significance

This commit establishes the canonical written architecture for MarkPush, making it easier for contributors, AI coding assistants, and maintainers to understand the system design before implementation. The shared config approach between the MCP server and CLI suggests a monorepo or shared library strategy.

## Related

- [[MarkPush Project]]
- [[MCP Server Implementation]]
- [[Device Pairing Protocol]]
- [[Markdown Push Protocol]]
- [[iOS TCA Architecture]]
- [[Cloud Relay Service]]
- [[End-to-End Encryption Design]]
- [[CLI and MCP Shared Config]]
- [[CLAUDE.md Documentation Standard]]
