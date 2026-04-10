---
status: quarantined
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:3ade875
ingested_at: 2026-04-10T02:04:52.504Z
parsed_at: 2026-04-10T02:04:52.504Z
compiled_to: null
processed_at: null
retry_count: 2
last_error: 400 {"type":"error","error":{"type":"invalid_request_error","message":"Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits."},"request_id":"req_011CZuM4Wjpjn7zTsa7mghQN"}
compile_progress: null
quarantined_at: 2026-04-10T03:02:37.396Z
---






# feat: Phase 1 design system + Phase 2 Supabase auth backend

- **Repo:** rahilsinghi/MarkPush
- **SHA:** 3ade875
- **Date:** 2026-03-17T03:42:54Z
- **Author:** Rahil Singhi
- **Files changed:** 25
- **Additions:** +1038
- **Deletions:** -127

Design System (iOS):
- Custom fonts: Fraunces, Playfair Display, Lora, Inter, JetBrains Mono
  as variable TTF files from Google Fonts (SIL OFL licensed)
- Colors.swift: full palette from design spec — warm parchment bg,
  deep indigo accent, source badge colors, adaptive light/dark
- Typography.swift: MPFont with semantic styles — appTitle, readerH1,
  cardTitle, body, code, metadata, sectionHeader
- Spacing.swift: consistent spacing/radius constants
- Color asset catalog: 6 adaptive colors (mpBackground, mpSurface,
  mpAccent, mpAccentSecondary, mpTextPrimary, mpTextSecondary)
- DocCard: redesigned with unread accent bar, pinned star, source
  badges with palette colors, tag pills with # prefix
- FeedView: warm parchment background, custom title, ScrollView+
  LazyVStack layout, context menus
- ReaderView: reading progress bar, custom MarkdownUI theme with
  palette colors, styled code blocks, blockquotes
- ReadingProgressBar: thin animated progress indicator
- CodeBlockView: dark bg code block with copy button + language label

Supabase Auth Backend:
- 002_auth_beta.sql: beta_whitelist, profiles, devices, push_tokens
  tables with full RLS policies
- Profile auto-creation trigger on auth.users INSERT
- Beta whitelist check function (called from Edge Function/Auth Hook)
- Updated pushes RLS to support both legacy device_id and JWT auth
- Indexes on user_id, email, device_id for performance
- seed.sql with initial beta whitelist email
