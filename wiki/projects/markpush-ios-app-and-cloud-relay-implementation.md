---
title: "MarkPush: iOS App and Cloud Relay Implementation"
author: ai
created_at: 2026-04-12T18:06:36.946Z
last_ai_edit: 2026-04-12T18:06:36.946Z
last_human_edit: null
last_embedded_hash: a1e757d4d9421813
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-implement-phase-3-ios-app-and-phase-4-cloud-relay-be3ef6.md]]"
tags:
  - markpush
  - ios
  - swiftui
  - tca
  - supabase
  - cloud
  - relay
  - encryption
  - mobile_app
  - networking
  - phase_3
  - phase_4
---


# MarkPush: iOS App and Cloud Relay Implementation

This article details the implementation of Phase 3 (iOS application) and Phase 4 (cloud relay) for the [[MarkPush]] project, as captured in commit `0443a20`. It outlines the architecture and features of the SwiftUI-based iOS app for receiving and viewing markdown documents, alongside the Supabase-backed cloud relay system for remote push notifications, enabling seamless content delivery.

## Key Concepts

iOS App Development (SwiftUI, TCA),Cloud Relay Architecture,Secure Data Transmission (AES-256-GCM, PBKDF2),Local Network Discovery (Bonjour),Realtime Database (Supabase Realtime),Persistent Storage (SwiftData, KeychainManager),Automated Transport Logic (WiFi first, Cloud fallback),Role-Level Security (RLS) and Time-to-Live (TTL)

## Details

This commit (`0443a20`) for the [[MarkPush]] project introduces the core functionality for both the iOS application (Phase 3) and the cloud relay system (Phase 4). The implementation encompasses: 

### iOS App (SwiftUI + TCA)

*   **App Structure**: Features an app entry point with `TabView` for `Feed` (live document stream) and `Settings`.
*   **Data Models**: Defines `SwiftData` models for `MarkDocument`, `Device`, and `Annotation` to manage local content and device information.
*   **Protocol Types**: Implements `PushMessage`, `AckMessage`, and `PairInitPayload` for inter-device communication.
*   **TCA Features**: Integrates The Composable Architecture (TCA) for robust state management across:
    *   `Feed`: Displays a live stream of markdown documents.
    *   `Reader`: A dedicated markdown viewer.
    *   `Pairing`: Manages the QR scan flow for device pairing.
    *   `Settings`: Configures font size and device management.
*   **`MarkPushClient`**: A TCA dependency with live and test implementations for backend interactions.
*   **Networking**: 
    *   `WiFiReceiver`: Utilizes `Network.framework` with Bonjour advertising for local network pushes.
    *   `CloudReceiver`: Subscribes to `Supabase Realtime` for remote push notifications.
*   **Security**: 
    *   `CryptoUtils`: Provides AES-256-GCM decryption/encryption and PBKDF2 key derivation using `CryptoKit`, ensuring compatibility with the CLI's `nonce||ciphertext||tag` format.
    *   `KeychainManager`: Securely stores encryption keys and device IDs.
*   **UI Components**: Includes reusable components like `DocCard`, `SourceBadge`, `TagPill`, and `ConnectionBadge`.
*   **Theme System**: Incorporates a comprehensive theme system covering typography, semantic colors, and spring animations.
*   **Testing**: Comprehensive TCA tests for `Feed`, `Reader`, and `Pairing` features.
*   **Dependencies**: Manages Swift Package Manager (SPM) dependencies via `Package.swift`.

### Cloud Relay (Supabase)

*   **SQL Migration**: Establishes a `pushes` table with `Row-Level Security (RLS)`, `realtime` capabilities, and `Time-to-Live (TTL)` for managing push data.
*   **CLI Cloud Transport**: Introduces `CloudSender` utilizing the Supabase REST API for sending pushes from the command-line interface.
*   **Auto-Transport Logic**: Implements a prioritized transport mechanism where `WiFi` is attempted first (with a 2-second timeout), falling back to `cloud` transport if configured and WiFi is unavailable.
*   **Transport Configuration**: `Transport.Select` now accepts `Options` that include Supabase credentials, allowing flexible transport configuration.

## Related

[[MarkPush]],[[Cloud Push Debugging Guide and User ID Requirements]],[[Cloud Relay User ID Routing and Silent Failure Logging Fix (MarkPush)]],[[CLAUDE.md Update: E2E Findings, Transport Decisions, and npm Publish Status in MarkPush]],[[Branded CLI Output and Polished MCP Tool Responses (MarkPush)]],[[MarkPush Project Screenshots]],[[Commit: Add MarkPush Project Screenshots]],[[Remove Implementation Plan from MarkPush Repository]]
