---
title: MarkPush — Git Activity
status: current
author: ai
source_type: git-commits
created_at: 2026-04-08T23:09:27.895Z
updated_at: 2026-04-08T23:09:27.895Z
tags:
  - git-activity
  - markpush
category: projects
last_embedded_hash: b3e62ac09725a97f
---


# MarkPush — Git Activity

## Summary

MarkPush is a tool for pushing markdown content from a development environment directly to an iOS reading app, supporting both local WiFi and cloud relay transport mechanisms. Built in a rapid development sprint during March 2026, it exposes an [[proj-parser|MCP server]] interface allowing AI coding assistants to trigger document delivery to a paired iPhone. The project targets developers who want to read long-form content — notes, drafts, articles — on their phone without friction.

---

## Key Developments

### Phase-by-Phase CLI and Transport Architecture

The project was scaffolded and developed across six explicit phases within a single day (March 16–17). Phase 1 delivered a CLI tool for pushing markdown files; Phase 2 added WiFi-based transport with device pairing; Phases 3 and 4 introduced the iOS companion app and a cloud relay fallback; Phases 5 and 6 added power features and packaging for distribution. This mirrors the kind of systematic build-out seen in projects like [[proj-edgemesh]] and [[proj-marketpulse-ai]].

### MCP Server Integration

A dedicated `@markpush/mcp-server` package was planned, documented, and implemented on March 17, enabling AI assistants (e.g., Claude via MCP) to call `push` tools directly. Subsequent commits cleaned up the WebSocket dependency (`ws`) and refined transport logic. A notable UX improvement on March 20 made MCP pairing non-blocking — returning a QR code immediately rather than waiting for device confirmation. This kind of MCP-first tooling reflects broader patterns in [[decision-framework-what-to-build-first-for-job-search-automation]].

### iOS App and Supabase Auth

The iOS app received a full design system (Phase 1 design), Supabase magic link authentication, and OTP auth flow across March 17–18. Build issues specific to Xcode 26.3 were resolved, and physical device compatibility for iOS 26 was patched the following day. Lessons learned were documented in `CLAUDE.md` — a recurring practice for maintaining institutional knowledge, similar in spirit to [[brain-repo-phase-4-telegram-test-result]].

### Production Hardening and OSS Release

March 18 saw a cluster of stabilization commits: production hardening for source distribution, MCP server v0.2.0, client and feed cleanup, and a rewritten README oriented toward open-source marketing. The implementation plan was removed from the repo, signaling a shift from planning artifact to shipped product.

### Cloud Relay Debugging and Device Deployment

Late-stage commits on March 24 and 27 addressed cloud relay routing bugs (specifically `user_id` routing failures and silent failure logging) and added a device deploy guide to `CLAUDE.md`. These reflect the operational realities of a two-transport system (WiFi vs. cloud) that must degrade gracefully.

### Demo and Distribution Campaign

On March 20, demo content was added alongside a LinkedIn post campaign, suggesting MarkPush was being positioned for public visibility — consistent with how [[rahil-singhi]] approaches project launches with an outbound distribution moment.

---

## Timeline

### March 16, 2026
Project foundation established. Phase 1 CLI tool implemented and committed within the same day.

### March 17, 2026
Most active day in the repository. WiFi transport and pairing (Phase 2), iOS app (Phase 3), cloud relay (Phase 4), power features and packaging (Phases 5–6), and the MCP server were all implemented. System architecture diagrams and MCP server plans were documented. Supabase auth backend and iOS magic link login were added. E2E tests written covering backend, auth, settings, and library flows. Multiple Xcode build fixes landed the same day.

### March 18, 2026
OTP auth finalized; E2E WiFi and cloud push verified end-to-end. iOS 26 physical device compatibility fixed. Production hardening, MCP server v0.2.0, and codebase cleanup completed. README rewritten for OSS positioning. Branded CLI output polished.

### March 20, 2026
Demo content and LinkedIn campaign assets added. Non-blocking MCP pairing (QR code returned immediately) implemented as a UX improvement.

### March 24, 2026
Device deploy guide, transport architecture notes, and a macro trust fix added to `CLAUDE.md`.

### March 27, 2026
Cloud relay `user_id` routing bug fixed across MCP server and iOS app. Silent failure logging added. Cloud push debugging guide written into `CLAUDE.md`.
