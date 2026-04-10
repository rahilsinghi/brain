---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:8859c0e
ingested_at: 2026-04-10T09:03:48.646Z
parsed_at: 2026-04-10T09:03:48.646Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZupcNiuViXMKmYZ4yEvp"}
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
