---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:0443a20
ingested_at: 2026-04-10T09:03:48.648Z
parsed_at: 2026-04-10T09:03:48.648Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcsqNLvPTrx1pu8j1b"}
compile_progress: null
---



# feat: implement Phase 3 (iOS app) and Phase 4 (cloud relay)

- **Repo:** rahilsinghi/MarkPush
- **SHA:** 0443a20
- **Date:** 2026-03-17T00:49:19Z
- **Author:** Rahil Singhi
- **Files changed:** 33
- **Additions:** +2016
- **Deletions:** -45

iOS App (SwiftUI + TCA):
- App entry point with TabView (Feed + Settings)
- SwiftData models: MarkDocument, Device, Annotation
- Protocol types: PushMessage, AckMessage, PairInitPayload
- TCA features: Feed (live doc stream), Reader (markdown viewer),
  Pairing (QR scan flow), Settings (font size, device management)
- MarkPushClient TCA dependency with live/test implementations
- WiFiReceiver: Network.framework listener with Bonjour advertising
- CloudReceiver: Supabase Realtime subscription for remote pushes
- CryptoUtils: AES-256-GCM decrypt/encrypt + PBKDF2 key derivation
  using CryptoKit, matching CLI's nonce||ciphertext||tag format
- KeychainManager: secure storage for encryption keys and device ID
- UI components: DocCard, SourceBadge, TagPill, ConnectionBadge
- Theme system: typography, semantic colors, spring animations
- TCA tests for Feed, Reader, and Pairing features
- Package.swift with all SPM dependencies

Cloud Relay (Supabase):
- SQL migration: pushes table with RLS, realtime, TTL
- CLI cloud transport: CloudSender with Supabase REST API
- Auto-transport: WiFi first (2s), cloud fallback if configured
- Transport.Select now accepts Options with Supabase credentials
