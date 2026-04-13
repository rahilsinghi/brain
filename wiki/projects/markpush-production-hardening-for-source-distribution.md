---
title: "MarkPush: Production Hardening for Source Distribution"
author: ai
created_at: 2026-04-13T17:17:44.820Z
last_ai_edit: 2026-04-13T17:17:44.820Z
last_human_edit: null
last_embedded_hash: 76a67c47ebfd9c7b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-production-hardening-for-source-distribution-38dfbb.md]]"
tags:
  - markpush
  - production
  - hardening
  - ios
  - apple
  - compliance
  - logging
  - networking
  - cli
---


# MarkPush: Production Hardening for Source Distribution

This feature commit focuses on enhancing the `rahilsinghi/MarkPush` project for production readiness, primarily addressing stability, debuggability, and Apple App Store compliance. Key improvements include dynamic port allocation for WiFi listeners, structured logging, and the implementation of Apple's required privacy declarations.

## Key Concepts

Dynamic Port Allocation,Structured Logging,mDNS Discovery,Apple App Store Compliance,Privacy Manifests,Export Compliance (ITSAppUsesNonExemptEncryption),Application Versioning

## Details

This commit (SHA: `7a68fa5`) in the `rahilsinghi/MarkPush` repository, authored by Rahil Singhi on 2026-03-18, implements several critical production hardening measures. It involved changes across 4 files, with 63 additions and 18 deletions.

The main enhancements include:
*   **Dynamic Port Allocation for WiFi Listener**: The system now uses dynamic ports for the WiFi listener, preventing the 'Address already in use' error on application restarts. This allows the CLI to discover the application via mDNS, improving robustness and user experience.
*   **Structured Logging with `os.Logger`**: All `print()` statements have been replaced with `os.Logger` for structured logging. This is crucial for debugging deployed builds, as logs become visible and parseable in tools like Console.app.
*   **Apple PrivacyInfo.xcprivacy Declaration**: To comply with Apple's requirements (mandatory since May 2024), a `PrivacyInfo.xcprivacy` file has been added. This file declares that the application does not track users, uses email for authentication, and accesses `UserDefaults`.
*   **Export Compliance Declaration**: The `ITSAppUsesNonExemptEncryption=false` flag has been added. This declaration is necessary for export compliance, indicating that the application does not use non-exempt encryption.
*   **Version and Build Number in Settings**: The application's version and build number (e.g., `0.1.0 (1)`) are now displayed in the Settings menu, providing clear identification for users and support personnel.

## Related

[[MarkPush]],[[mDNS Discovery]],[[Structured Logging]],[[Apple App Store Compliance]],[[Privacy Manifests]],[[Application Versioning]],[[Backend Fix: Add Vercel Production URL to CORS Origins (Karen Project)]]
