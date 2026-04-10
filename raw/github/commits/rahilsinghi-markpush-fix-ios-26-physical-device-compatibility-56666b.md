---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:55aa4b6
ingested_at: 2026-04-10T02:04:52.504Z
parsed_at: 2026-04-10T02:04:52.504Z
compiled_to: "[[iOS 26 Physical Device Compatibility Fix (MarkPush)]]"
processed_at: 2026-04-10T02:18:03.256Z
retry_count: 1
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuHcggJ3eQxZ1UDjQbq2\"}"
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
