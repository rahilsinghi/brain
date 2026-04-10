---
status: processed
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:d43897a
ingested_at: 2026-04-10T02:04:52.504Z
parsed_at: 2026-04-10T02:04:52.504Z
compiled_to: "[[iOS Auth Flow with Supabase Magic Link Login (MarkPush)]]"
processed_at: 2026-04-10T02:56:07.121Z
retry_count: 1
last_error: "429 {\"type\":\"error\",\"error\":{\"type\":\"rate_limit_error\",\"message\":\"This request would exceed your organization's rate limit of 8,000 output tokens per minute (org: 9bdecd1f-f807-4ccd-b7ed-13c62f0e8eaf, model: claude-sonnet-4-6). For details, refer to: https://docs.claude.com/en/api/rate-limits. You can see the response headers for current usage. Please reduce the prompt length or the maximum tokens requested, or try again later. You may also contact sales at https://claude.com/contact-sales to discuss your options for a rate limit increase.\"},\"request_id\":\"req_011CZuLXvyEgasSUB8HeaXbh\"}"
compile_progress: null
---















# feat: iOS auth flow with Supabase magic link login

- **Repo:** rahilsinghi/MarkPush
- **SHA:** d43897a
- **Date:** 2026-03-17T07:11:01Z
- **Author:** Rahil Singhi
- **Files changed:** 12
- **Additions:** +620
- **Deletions:** -40

AuthClient: TCA dependency wrapping Supabase Auth — signInWithOTP,
handleDeepLink, restoreSession, signOut. Reads credentials from
Info.plist (SupabaseURL, SupabaseAnonKey).

AuthFeature: 4-step state machine (checking → landing → magicLinkSent
→ authenticated) with email validation, OTP send, deep link callback,
session restore, resend, and error handling.

AuthView: Landing screen (logo, email input, "Continue with Email"
CTA) and magic link confirmation screen (Open Mail, resend, use other
email). Uses design system (mpBackground, mpAccent, Fraunces, Inter).

AppFeature: Auth gating at root — shows AuthView when unauthenticated,
TabView when authenticated. Forwards deep links to AuthFeature. Resets
auth state on sign out.

MarkPushApp: .onOpenURL handler for markpush://auth/callback deep links.

Info.plist: markpush:// URL scheme, Supabase project credentials.

SettingsFeature/View: Account section with user email display and
Sign Out button with loading state.
