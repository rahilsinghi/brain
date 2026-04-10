---
title: MarkPush
author: ai
created_at: 2026-04-10T12:48:42.466Z
last_ai_edit: 2026-04-10T12:48:42.466Z
last_human_edit: null
last_embedded_hash: 06e03c99fcb02de6
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/repo-profiles/markpush-project-profile.md]]"
tags:
  - open-source
  - markdown
  - ios
  - cli
  - go
  - swiftui
  - typescript
  - nodejs
  - supabase
  - encryption
  - realtime
  - personal-tool
  - tca
  - swiftdata
  - mcp
  - ai-workflow
  - project
---


# MarkPush

MarkPush is an open-source personal tool that enables pushing markdown documents from a terminal directly to a native iOS app over encrypted WiFi or a cloud relay. It integrates a Go CLI, a SwiftUI iOS app, and a TypeScript Model Context Protocol (MCP) server, facilitating seamless AI-to-phone workflows.

## Key Concepts

- **Open-source personal tool**: Designed for individual use with public source code.,- **Markdown document pushing**: Core functionality to transfer markdown content.,- **Cross-platform access**: Available via Go CLI, iOS native app, and TypeScript MCP server.,- **Encrypted transport**: Uses AES-256-GCM and PBKDF2 for end-to-end encryption over WiFi (Raw TCP, mDNS) or Cloud (Supabase Realtime WebSockets).,- **AI-to-phone workflows**: Integration with AI agents (e.g., Claude Code) via the MCP server.,- **QR code pairing**: Secure device pairing mechanism using QR codes to exchange shared secrets.,- **Supabase integration**: Utilized for authentication (OTP), cloud relay, and Row Level Security (RLS).,- **TCA (The Composable Architecture)**: Architectural pattern used in the iOS app for state management and modularity.,- **SwiftData**: Apple's framework for local persistence and iCloud sync in the iOS app.

## Details

# MarkPush — Project Profile

## Project Summary

**MarkPush** is an open-source personal tool that pushes markdown documents from the terminal directly to a native iOS app over encrypted WiFi or cloud relay. Three entry points enable seamless AI-to-phone workflows:

- **Go CLI** (`cli/`) — Command-line tool with watch, pair, and push commands
- **iOS App** (`ios/`) — Native SwiftUI app with feed, reader, library, and authentication
- **MCP Server** (`mcp/`) — TypeScript Model Context Protocol server published to npm (`@markpush/mcp-server`), enabling Claude Code and AI agents to push directly

**Current Status**: Fully functional MVP. CLI ✓, iOS app ✓ (physical device), Cloud relay ✓, MCP server ✓ (published v0.2.0), Authentication ✓, WiFi transport ✓. See CLAUDE.md for comprehensive implementation notes and development setup.

---

## Tech Stack

| Layer | Technology | Key Libraries |
|-------|-----------|---|
| **CLI** | Go 1.25+ | Cobra (CLI framework), Viper (config), skip2/go-qrcode (QR gen), hashicorp/mdns (Bonjour) |
| **MCP Server** | Node.js 18+, TypeScript 5.7 | @modelcontextprotocol/sdk 1.27, Zod (validation), qrcode-terminal, @iarna/toml |
| **iOS** | Swift, SwiftUI, iOS 17+ | TCA (The Composable Architecture), SwiftData, KeychainAccess, Supabase client |
| **Transport** | Raw TCP (local), WebSocket (cloud) | Network.framework (WiFi), Supabase Realtime (cloud relay) |
| **Encryption** | AES-256-GCM | Go crypto, Web Crypto API, CryptoKit (Swift) |
| **Key Derivation** | PBKDF2 | SHA-256, 100,000 iterations, 32-byte output |
| **Auth** | Supabase | OTP (magic link + OTP codes), RLS, beta whitelist enforcement |
| **Persistence** | SwiftData | iCloud sync enabled, local documents storage |

---

## Architecture

### System Flow

```
Sender                  Transport              Receiver
─────────────────       ──────────────        ──────────
CLI / MCP / Any  →  AES-256-GCM  →  WiFi/Cloud  →  iOS App
                     Encrypt                      Decrypt
                                                  ↓
                                            Feed → Reader
                                            ↓ (SwiftData)
                                           Library
```

### Transport Architecture

**Local WiFi (mDNS)**: Raw TCP over `.any` port (OS-assigned). Sender discovers receiver via Bonjour (`_markpush._tcp`). No pairing required for transport; device ID and shared key are stored in Keychain (iOS) and `~/.config/markpush/config.toml` (CLI).

**Cloud Relay**: Supabase Realtime WebSocket. Messages encrypted client-side. Supabase only sees ciphertext. RLS filters: `user_id = auth.uid()` for authenticated clients. Requires legacy JWT anon key (not `sb_publishable_` format).

**Auto Transport**: Tries WiFi first (2s timeout), falls back to cloud. Respects `transport_mode` config: `"auto"` (default) | `"wifi"` | `"cloud"`.

### Encryption & Key Derivation

**Format**: `nonce(12B) || ciphertext || tag(16B)` → base64

**Key Derivation**: `PBKDF2(shared_secret, device_id, 100000 rounds, SHA-256) → 32-byte AES key`

**Pairing Flow**: QR code payload (minimal JSON) scanned on iOS. Both devices derive the same key from embedded secret + device ID. Credentials stored securely (Keychain on iOS, config file on desktop).

### Protocol

JSON message types:
- `push` — Document with title, tags, source, markdown content (base64 if encrypted)
- `pair_init` — QR code payload: version, secret, host, port, sender ID/name
- `pair_ack` — Pairing confirmation
- `ping` / `pong` — Keepalive
- `ack` — Message receipt acknowledgment
- `error` — Error response

All messages include: `version`, `type`, `id`, `timestamp`, `sender_id`, `sender_name`.

---

## Directory Structure

```
markpush/
├── cli/                    ← Go CLI tool (markpush binary)
│   ├── cmd/                ← Cobra commands: root, push, pair, watch, history, config
│   ├── internal/
│   │   ├── config/         ← toml parsing, ~/.config/markpush/ management
│   │   ├── crypto/         ← AES-256-GCM encryption, PBKDF2
│   │   ├── protocol/       ← JSON message schemas, title extraction
│   │   ├── transport/      ← Interface + WiFi/Cloud/DryRun implementations
│   │   ├── mdns/           ← Bonjour discovery
│   │   └── history/        ← Push history tracking
│   ├── pkg/qr/             ← QR code generation
│   ├── main.go
│   ├── go.mod
│   └── go.sum
│
├── ios/                    ← SwiftUI iOS app (iPhone only)
│   ├── MarkPush/
│   │   ├── App/            ← MarkPushApp (entry), AppFeature (TCA root)
│   │   ├── Features/       ← Auth, Feed, Reader, Library, Pairing, Settings
│   │   ├── Clients/        ← TCA dependencies: MarkPushClient, AuthClient, etc.
│   │   ├── Models/         ← SwiftData: Document, Device, User schemas
│   │   ├── Transport/      ← WiFiReceiver (TCP actor), CloudReceiver (Realtime)
│   │   ├── UI/             ← Theme, semantic colors, custom fonts (Fraunces, Lora, Inter)
│   │   ├── Utilities/      ← Logger, Extensions
│   │   ├── Resources/      ← Assets, strings
│   │   ├── Info.plist      ← App config (bundle ID, Supabase URL/key, fonts)
│   │   └── MarkPush.entitlements
│   ├── MarkPushTests/      ← TCA tests (50+ tests)
│   ├── project.yml         ← xcodegen config
│   └── MarkPush.xcodeproj  ← Generated by xcodegen
│
├── mcp/                    ← TypeScript MCP Server (@markpush/mcp-server)
│   ├── src/
│   │   ├── index.ts        ← Server entry point (stdio transport)
│   │   ├── tools/          ← push_markdown, push_template, pair_device, list_devices, etc.
│   │   ├── prompts/        ← Prompt templates (code-review, meeting-notes, etc.)
│   │   ├── config/         ← Shared config (TOML parsing)
│   │   ├── crypto/         ← Web Crypto AES-256-GCM
│   │   ├── protocol/       ← JSON message builders
│   │   ├── transport/      ← Auto transport selector
│   │   └── pairing/        ← Pairing server (HTTP + QR)
│   ├── dist/               ← Compiled JavaScript (npm package)
│   ├── tests/              ← Vitest tests
│   ├── package.json
│   ├── tsconfig.json
│   └── vitest.config.ts
│
├── relay/                  ← Self-hostable Supabase cloud relay
│   ├── supabase/           ← SQL migrations, RLS policies, auth config
│   └── README.md           ← Self-hosting guide
│
├── design/                 ← App icon, logo, UI mockups, onboarding
│   ├── MarkPush_ios_app_icon.png
│   ├── MarkPush_UI_design_pallete.png
│   └── ...
│
├── docs/                   ← Architecture documentation
│   ├── system-architecture.md  ← Full diagrams
│   ├── api-contracts.md        ← JSON schema
│   ├── pairing-protocol.md     ← QR + key exchange
│   ├── architecture.md         ← Transport layers
│   ├── self-hosting.md         ← Supabase setup
│   └── demo/                   ← Sample documents
│
├── scripts/                ← Install, dev setup, release
│   ├── install.sh
│   ├── dev-setup.sh
│   └── release.sh
│
├── .github/                ← GitHub Actions, PR templates
├── .claude/                ← Claude Code configuration
├── Makefile                ← Build targets
├── README.md               ← User-facing guide
├── CLAUDE.md               ← Developer context (280+ lines)
├── CHANGELOG.md
├── LICENSE (MIT)
└── CONTRIBUTING.md
```

---

## Key Components

### Go CLI (`cli/`)

**Commands**:
- `markpush push [file]` — Push markdown file or stdin. Flags: `--title`, `--tag`, `--source`, `--stdin`, `--wifi`, `--cloud`, `--dry-run`
- `markpush pair` — Initiate QR pairing (180s server). Stores secrets in `~/.config/markpush/config.toml`
- `markpush watch [dir]` — File watcher. Pushes on save
- `markpush history` — Show recent pushes with metadata
- `markpush config` — View/edit configuration

**Internal Modules**:
- **transport**: `Send()` interface with WiFi (mDNS), Cloud (Supabase), DryRun implementations
- **crypto**: `Encrypt()` / `Decrypt()` using AES-256-GCM + PBKDF2
- **protocol**: Message builders, title extraction from markdown
- **mdns**: Bonjour service discovery
- **config**: TOML file management + environment overrides

### iOS App (`ios/MarkPush/`)

**Architecture**: TCA (The Composable Architecture) throughout. All networking injected via `MarkPushClient` dependency.

**Features**:
- **Auth**: Supabase magic link + OTP fallback. Session persistence (30-day re-auth via Keychain)
- **Feed**: Real-time push notification list (WiFi + Cloud). Tap to read
- **Reader**: Full markdown rendering (swift-markdown-ui + Splash syntax highlighting). Tables, code blocks, images
- **Library**: SwiftData persistence. All documents searchable
- **Pairing**: QR scanner + manual secret entry. Credential storage in Keychain
- **Settings**: Device management, logout, config

**Key Dependencies**:
- SwiftUI + TCA (Composable Architecture)
- SwiftData (local persistence)
- Supabase (auth + Realtime)
- KeychainAccess (secure storage)
- swift-markdown-ui + Splash (markdown + code highlighting)

**Transport**:
- `WiFiReceiver` (actor): TCP listener on `.any` port, advertises via Bonjour
- `CloudReceiver`: Supabase Realtime subscription filtered by `user_id`

### TypeScript MCP Server (`mcp/`)

**Platforms**: npm (`@markpush/mcp-server`), local dev build, Claude Code

**Tools** (6):
1. `push_markdown` — Push markdown with title, tags
2. `push_template` — Push using templates: code-review, meeting-notes, daily-summary, bug-report
3. `pair_device` — Initiate QR pairing (interactive terminal)
4. `list_devices` — Show paired devices
5. `push_history` — Recent push history
6. `unpair_device` — Remove paired device

**Prompts** (system + user context):
- Guide users to common MarkPush actions
- Remind about template-based shortcuts

**Transport**:
- Reuses CLI logic: Auto-selects WiFi → Cloud
- Shared config at `~/.config/markpush/config.toml`
- Web Crypto for AES-256-GCM (cross-platform)

**Installation**:
```bash
# Global (user-scoped)
claude mcp add --scope user markpush -- npx -y @markpush/mcp-server

# Local dev
claude mcp add --scope user markpush -- node /path/to/mcp/dist/index.js
```

### Supabase Cloud Relay (`relay/`)

**Services**:
- **Auth**: OTP via magic link + fallback code entry
- **Database**: `devices` (pairing metadata), `pushes` (cloud relay storage), `profiles` (user metadata)
- **Realtime**: WebSocket subscriptions with RLS (user_id filtering)
- **RLS Policies**:
  - Anon: `INSERT` any `user_id` (CLI not auth'd)
  - Authenticated: `SELECT` own `user_id` only
  - Realtime filters by `user_id`

**Self-Hosting**: Full guide in `docs/self-hosting.md`. Requires Supabase account + migrations.

**CRITICAL NOTES**:
- Use **legacy JWT keys** (`eyJ...`), NOT `sb_publishable_` format for Realtime
- Cloud pushes require `user_id` set in `config.toml` under `[cloud]`
- Realtime subscription filters: `.eq("user_id", value: userID)`
- If pushes land with `user_id = null`, CloudReceiver silently drops them

---

## APIs & Integrations

### External Services

1. **Supabase**
   - REST API: Auth (sign up, verify OTP), device management
   - Realtime WebSocket: Cloud push delivery
   - RLS: Fine-grained access control
   - Self-hostable Docker stack

2. **Bonjour (mDNS)**
   - Service type: `_markpush._tcp`
   - Local network discovery (iOS + macOS)
   - Zero configuration required

### Internal Protocols

**JSON Messages** (see `docs/api-contracts.md`):
```json
{
  "version": "1",
  "type": "push",
  "id": "<uuid>",
  "timestamp": "2026-04-09T...",
  "title": "Document Title",
  "tags": ["tag1"],
  "source": "claude",
  "content": "base64(...)",
  "encrypted": true,
  "sender_id": "<device-id>",
  "sender_name": "MacBook Pro"
}
```

**QR Code Payload** (minimal JSON):
```json
{
  "v": "1",
  "s": "<shared-secret>",
  "h": "192.168.1.100",
  "p": 54321,
  "id": "<sender-device-id>",
  "name": "CLI Device"
}
```

---

## Development Setup

### Prerequisites

- **Go 1.25+** (CLI)
- **Xcode 16+** with iOS 17+ SDK (iOS app)
- **Node.js 18+** (MCP Server)
- **xcodegen** (`brew install xcodegen`)

### CLI

```bash
cd cli
go run . --help          # Run directly
go install .
go test ./... -race      # Tests
```

### iOS App

```bash
cd ios
xcodegen generate        # Generate .xcodeproj from project.yml
open MarkPush.xcodeproj
# In Xcode:
# 1. Wait for SPM package resolution
# 2. Signing & Capabilities → set Team (free Personal Team works)
# 3. Select iPhone → Cmd+R
```

**Important**: After `xcodegen generate`, macro trust is reset. Click each TCA macro error in build log → "Trust & Enable" (ComposableArchitectureMacros, CasePathsMacros, DependenciesMacrosPlugin, PerceptionMacros).

**Simulator**: Can't discover via Bonjour. Use cloud transport or manual testing.

### MCP Server

```bash
cd mcp
npm install              # Install deps
npm run build            # Compile TypeScript
npm test                 # Run tests
npm run dev              # Run locally
```

**Local integration with Claude Code**:
```bash
claude mcp add --scope user markpush -- node /path/to/mcp/dist/index.js
```

### Configuration

Shared config at `~/.config/markpush/config.toml`:

```toml
[device]
device_id = "<uuid>"
device_name = "My MacBook"
secret = "<base64-encoded-shared-secret>"

[transport]
transport_mode = "auto"  # or "wifi" or "cloud"

[wifi]
receiver_id = "<device-id>"

[cloud]
supabase_url = "https://..."
supabase_key = "eyJ..."  # Legacy JWT key!
user_id = "<supabase-user-uuid>"  # CRITICAL for cloud pushes
```

---

## Current State

### Working

- **CLI**: All commands (push, pair, watch, history, config)
- **WiFi Transport**: mDNS discovery, raw TCP, local encryption/decryption
- **Cloud Transport**: Supabase Realtime, RLS, user_id routing
- **iOS App**: Auth (magic link + OTP), Feed, Reader, Library, SwiftData persistence
- **MCP Server**: 6 tools, 4 prompts, published to npm (v0.2.0)
- **Encryption**: AES-256-GCM + PBKDF2 across all platforms
- **Physical Device**: Tested on iPhone 16+ with free Personal Team
- **E2E Testing**: 50+ TCA tests, 33 SQL backend tests, 32 MCP tests
- **Design System**: Custom fonts (Fraunces, Lora, Inter), semantic colors, accessibility

### Incomplete / Known Limitations

- **TestFlight**: Requires paid Apple Developer account ($99/year). Current deployment is sideload only
- **APNs Push Notifications**: Requires Developer account; free Personal Team has no APNs support
- **App Store Release**: Not planned; personal-use sideload model preferred
- **MCP npm Version**: v0.2.0 published, but local build may have latest fixes (esp. user_id routing). Use local dev build during development
- **Cloud Relay User ID**: Must be manually set if not auto-populated by pairing. Missing `user_id` silently breaks cloud pushes
- **Simulator Bonjour**: Can't discover Bonjour services. Use cloud transport on simulator
- **UI Polish**: Core features done; dark mode, additional accessibility features TBD

### Performance

- **WiFi Latency**: <100ms (local network)
- **Cloud Latency**: 1-2s (Realtime WebSocket round-trip)
- **Message Size**: Typical markdown document (5-10KB) → AES-GCM overhead ~50B
- **Concurrent Users**: Cloud relay supports multi-user with RLS isolation

### Security

- **E2E Encryption**: All content encrypted client-side; server never sees plaintext
- **Key Storage**: Keychain (iOS), config file (CLI)
- **Auth**: Supabase OTP + magic link; 30-day session persistence
- **RLS**: Supabase row-level security enforces user isolation
- **No Telemetry**: Open source, self-hostable relay option

---

## Next Milestones

1. **TestFlight Beta** — Paid Developer account → App Store distribution
2. **Additional Templates** — AI prompt templates (blog post, technical spec, PR description)
3. **Watch Complications** — Apple Watch app preview
4. **Export**: PDF, HTML export from Library
5. **Sharing**: Share documents via deep link (ephemeral)
6. **CLI Enhancements**: `markpush sync` for bidirectional docs, `markpush search`

## Related

[[Go (programming language)]],[[SwiftUI]],[[Node.js]],[[TypeScript]],[[Supabase]],[[The Composable Architecture]],[[SwiftData]],[[AES-256-GCM]],[[PBKDF2]],[[mDNS (Bonjour)]],[[WebSocket]],[[CLI (Command Line Interface)]],[[End-to-End Encryption]],[[Markdown]],[[AI Agents]],[[Open Source Software]]
