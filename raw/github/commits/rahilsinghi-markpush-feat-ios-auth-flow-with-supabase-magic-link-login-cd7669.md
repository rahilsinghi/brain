---
status: pending
source_type: git-commits
source_id: git-commit:rahilsinghi/MarkPush:d43897a
ingested_at: 2026-04-09T03:18:47.771Z
parsed_at: 2026-04-09T03:18:47.771Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
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
