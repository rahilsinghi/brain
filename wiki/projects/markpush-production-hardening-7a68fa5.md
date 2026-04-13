---
title: MarkPush Production Hardening (7a68fa5)
author: ai
created_at: 2026-04-10T15:10:25.964Z
last_ai_edit: 2026-04-10T15:10:25.964Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-production-hardening-for-source-distribution-38dfbb.md]]"
tags:
  - markpush
  - production hardening
  - logging
  - networking
  - apple compliance
  - privacy
  - security
  - deployment
  - ios development
  - bug fix
---

# MarkPush Production Hardening (7a68fa5)

This commit introduces several critical enhancements to the MarkPush application, focusing on production readiness. It addresses reliability by using dynamic networking, improves debuggability with structured logging, and ensures Apple platform compliance by adding privacy manifests and encryption declarations.

## Key Concepts

Dynamic Port Allocation,mDNS (Multicast DNS),Structured Logging,os.Logger,Apple Privacy Manifests (PrivacyInfo.xcprivacy),Export Compliance (ITSAppUsesNonExemptEncryption),Application Versioning

## Details

This commit (SHA: `7a68fa5`) by [[Rahil Singhi]] on 2026-03-18 significantly hardens the [[MarkPush]] application for production deployment. It involved changes across 4 files, with 63 additions and 18 deletions.

Key improvements include:
*   **Dynamic Port for WiFi Listener**: The application now uses a dynamic port (`.any`) for its WiFi listener. This change prevents "Address already in use" errors that could occur on application restart, significantly improving reliability. The CLI discovers the application using mDNS.
*   **Structured Logging with `os.Logger`**: All `print()` statements have been replaced with `os.Logger` for structured logging. This makes debugging deployed builds significantly easier, as logs are visible in `Console.app` on macOS/iOS.
*   **Apple Privacy Manifest (`PrivacyInfo.xcprivacy`)**: A `PrivacyInfo.xcprivacy` file has been added. This manifest declares that the application does not engage in tracking, details the use of email for authentication, and specifies `UserDefaults` access. This is a mandatory requirement from Apple since May 2024.
*   **Export Compliance Declaration**: The `ITSAppUsesNonExemptEncryption=false` flag has been added to address export compliance requirements, indicating that the application does not use non-exempt encryption.
*   **Version Display in Settings**: The application now displays its version and build number (e.g., `0.1.0 (1)`) within the Settings interface, providing users and developers with clear information about the installed build.

## Related

[[MarkPush]],[[Rahil Singhi]],[[mDNS]],[[Structured Logging]],[[Apple Privacy Manifests]],[[ITSAppUsesNonExemptEncryption]],[[Software Deployment]],[[Debugging]]
