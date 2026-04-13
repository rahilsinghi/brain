---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:ada2e1b
ingested_at: 2026-04-13T18:05:31.400Z
parsed_at: 2026-04-13T18:05:31.400Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: implement Phase 1 CLI tool

- **Repo:** rahilsinghi/MarkPush
- **SHA:** ada2e1b
- **Date:** 2026-03-16T23:32:18Z
- **Author:** Rahil Singhi
- **Files changed:** 20
- **Additions:** +2003
- **Deletions:** -0

Go CLI with cobra command structure, protocol types, AES-256-GCM
encryption, PBKDF2 key derivation, Viper config management, and
dry-run push command.

- cmd: root, push (full), pair/watch/history (stubs), config show/path
- internal/protocol: PushMessage, AckMessage, PairInitMessage with
  JSON serialization, title extraction, word counting
- internal/crypto: AES-256-GCM encrypt/decrypt, PBKDF2 key derivation
  matching pairing protocol spec (SHA-256, 100k iterations, 32-byte key)
- internal/config: Viper+TOML config, auto device ID generation,
  paired device key loading, 0600 file permissions
- internal/transport: Transport interface, DryRunTransport (lipgloss),
  WiFi/Cloud stubs for Phase 2/4
- Tests: table-driven across all packages, race-safe
