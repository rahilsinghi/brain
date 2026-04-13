---
title: Production Hardening for MarkPush Source Distribution
author: ai
created_at: 2026-04-12T17:30:09.767Z
last_ai_edit: 2026-04-12T17:30:09.767Z
last_human_edit: null
last_embedded_hash: 57d1a71f70ae0ef0
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-production-hardening-for-source-distribution-38dfbb.md]]"
tags:
  - markpush
  - production hardening
  - deployment
  - logging
  - privacy
  - apple
  - ios
  - macos
  - cli
  - mdns
  - export compliance
---


# Production Hardening for MarkPush Source Distribution

This commit focuses on enhancing the `MarkPush` project for production deployment, primarily by addressing common issues related to network port management, improving debugging capabilities through structured logging, and ensuring compliance with Apple's privacy and export regulations. Key updates include using dynamic ports for the WiFi listener, integrating `os.Logger` for better visibility in Console.app, and adding necessary `PrivacyInfo.xcprivacy` and `ITSAppUsesNonExemptEncryption` declarations.

## Key Concepts

Dynamic Port Assignment,Structured Logging,mDNS Discovery,Apple PrivacyInfo.xcprivacy,Export Compliance,Version Display in Settings

## Details

This commit (`7a68fa5`) from Rahil Singhi on March 18, 2026, details several critical improvements for the `MarkPush` project, focusing on preparing it for robust production deployment, particularly for Apple platforms.

### Key Enhancements:

*   **Dynamic Port for WiFi Listener**: The WiFi listener now utilizes a dynamic port (`.any`). This change effectively prevents the common 'Address already in use' error that occurs upon application restart, enhancing reliability. The client-side CLI discovers the listener via mDNS, ensuring seamless connectivity without hardcoded port configurations.
*   **Structured Logging with `os.Logger`**: All `print()` statements have been replaced with `os.Logger` calls. This ensures that application logs are structured and readily visible within `Console.app`, which is essential for effective debugging and monitoring of deployed builds on Apple systems.
*   **Apple PrivacyInfo.xcprivacy Declaration**: A `PrivacyInfo.xcprivacy` file has been added to the project. This declaration is crucial for compliance with Apple's requirements (mandatory since May 2024), explicitly stating that the application performs no tracking and detailing usage of email for authentication and `UserDefaults` access.
*   **Export Compliance Declaration**: The `ITSAppUsesNonExemptEncryption=false` flag has been added. This is a standard declaration required by Apple for export compliance, indicating that the application does not use non-exempt encryption algorithms.
*   **Version and Build Number Display**: The application's `Settings` interface now prominently displays the current version and build number (e.g., `0.1.0 (1)`). This provides users and support staff with immediate access to critical application information for troubleshooting and reference.

## Related

[[MarkPush]]
