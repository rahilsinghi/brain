---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:c3eb33c
ingested_at: 2026-04-09T21:03:21.203Z
parsed_at: 2026-04-09T21:03:21.203Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM2pdYPkwqfC2e6XzFE"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:14.455Z
---






# fix: resolve Xcode 26.3 build errors in iOS app

- **Repo:** rahilsinghi/MarkPush
- **SHA:** c3eb33c
- **Date:** 2026-03-17T02:48:00Z
- **Author:** Rahil Singhi
- **Files changed:** 15
- **Additions:** +1217
- **Deletions:** -48

- CryptoUtils: add missing CommonCrypto import for PBKDF2
- MarkPushClient: add UIKit import for UIDevice, await MainActor-
  isolated UIDevice.current.name
- Keychain: use @preconcurrency import and nonisolated(unsafe) for
  non-Sendable KeychainAccess type
- WiFiReceiver: mark messages property as nonisolated
- SettingsView: replace $store binding with manual Binding for sheet
- PairingView: use .tint instead of .accent for ShapeStyle
- CloudReceiver: fix mixed-type dictionary in Supabase .update() call
- project.yml: explicit SPM product names, relaxed concurrency to
  targeted, added Info.plist with camera/network permissions
- Remove Package.swift (SPM deps managed by xcodegen project.yml)
