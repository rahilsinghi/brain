---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:7a68fa5
ingested_at: 2026-04-09T03:18:47.759Z
parsed_at: 2026-04-09T03:18:47.759Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# feat: production hardening for source distribution

- **Repo:** rahilsinghi/MarkPush
- **SHA:** 7a68fa5
- **Date:** 2026-03-18T07:31:53Z
- **Author:** Rahil Singhi
- **Files changed:** 4
- **Additions:** +63
- **Deletions:** -18

- Use dynamic port (.any) for WiFi listener — eliminates "Address
  already in use" on restart, CLI discovers via mDNS
- Replace all print() with os.Logger for structured logging visible
  in Console.app (essential for debugging deployed builds)
- Add PrivacyInfo.xcprivacy declaring no tracking, email for auth,
  UserDefaults access (required by Apple since May 2024)
- Add ITSAppUsesNonExemptEncryption=false for export compliance
- Show version + build number in Settings (0.1.0 (1))
