---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:8859c0e
ingested_at: 2026-04-10T02:04:52.505Z
parsed_at: 2026-04-10T02:04:52.505Z
compiled_to: "[[Fix: iOS App Runs on Simulator Successfully (SHA 8859c0e)]]"
processed_at: 2026-04-10T02:44:23.567Z
retry_count: 0
last_error: null
compile_progress: null
---













# fix: iOS app runs on simulator successfully

- **Repo:** rahilsinghi/MarkPush
- **SHA:** 8859c0e
- **Date:** 2026-03-17T03:14:12Z
- **Author:** Rahil Singhi
- **Files changed:** 7
- **Additions:** +56
- **Deletions:** -26

- Info.plist: add all required bundle keys (CFBundleIdentifier, etc.)
  fixing "Missing bundle ID" simulator install error
- MarkPushApp: explicit ModelContainer init with error handling
- Entitlements: remove multicast (incompatible with free dev team)
- CloudReceiver: use subscribeWithError, suppress unused try warning
- project.yml: remove multicast entitlement, use INFOPLIST_FILE
