---
status: failed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:55aa4b6
ingested_at: 2026-04-10T08:03:40.146Z
parsed_at: 2026-04-10T08:03:40.146Z
compiled_to: null
processed_at: null
retry_count: 1
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuk2MaHeZzrovBnZzG8n"}
compile_progress: null
---



# fix: iOS 26 physical device compatibility

- **Repo:** rahilsinghi/MarkPush
- **SHA:** 55aa4b6
- **Date:** 2026-03-18T07:31:12Z
- **Author:** Rahil Singhi
- **Files changed:** 8
- **Additions:** +50
- **Deletions:** -20

- Replace NavigationStack toolbar with custom header to remove iOS 26
  Liquid Glass system "..." button on FeedView
- Add .tabViewStyle(.tabBarOnly) to suppress sidebar toggle
- Fix font weight warning: swap Lora font faces instead of .fontWeight()
  on custom fonts
- Add UIRequiresFullScreen for portrait-only orientation
- Set emitLocalSessionAsInitialSession on Supabase client
- Fix PairingView dismiss using @Environment(\.dismiss)
- Add DEVELOPMENT_TEAM for device signing
