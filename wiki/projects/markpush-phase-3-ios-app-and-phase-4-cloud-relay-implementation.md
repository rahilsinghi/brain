---
title: "MarkPush: Phase 3 (iOS App) and Phase 4 (Cloud Relay) Implementation"
author: ai
created_at: 2026-04-11T01:31:47.746Z
last_ai_edit: 2026-04-11T01:31:47.746Z
last_human_edit: null
last_embedded_hash: 7ffc422fb7236440
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-feat-implement-phase-3-ios-app-and-phase-4-cloud-relay-be3ef6.md]]"
tags:
  - markpush
  - ios
  - swiftui
  - tca
  - supabase
  - cloud relay
  - cryptography
  - keychain
  - network
  - mobile development
  - phase 3
  - phase 4
  - push notifications
---


# MarkPush: Phase 3 (iOS App) and Phase 4 (Cloud Relay) Implementation

This article details the completion of Phase 3, the iOS application, and Phase 4, the cloud relay system, for the [[MarkPush]] project. The iOS app, built with [[SwiftUI]] and [[The Composable Architecture (TCA)]], enables live document streaming and secure management of push notifications. The cloud relay leverages [[Supabase]] for remote push functionality with a WiFi-first, cloud-fallback transport mechanism.

## Key Concepts

- [[MarkPush]],- [[iOS App Development]],- [[SwiftUI]],- [[The Composable Architecture (TCA)]],- [[SwiftData]],- [[Supabase]],- [[Cloud Relay]],- [[Push Notifications]],- [[Cryptography]] (AES-256-GCM, PBKDF2),- [[Keychain Management]],- [[Bonjour]] Advertising,- [[Realtime]] Database

## Details

This commit (`0443a20`) by Rahil Singhi on 2026-03-17 marks the implementation of two significant phases for the [[MarkPush]] project: the iOS application (Phase 3) and the cloud relay system (Phase 4).

### iOS App (SwiftUI + TCA)

The iOS application provides a robust mobile experience for [[MarkPush]], incorporating modern Apple frameworks and architectural patterns:

*   **App Entry Point**: Features an app entry point with `TabView` for `Feed` (live document stream) and `Settings`.
*   **Data Models**: Utilizes [[SwiftData]] for `MarkDocument`, `Device`, and `Annotation` models.
*   **Protocol Types**: Defines `PushMessage`, `AckMessage`, and `PairInitPayload` for inter-device communication.
*   **TCA Features**: Implements dedicated [[The Composable Architecture (TCA)]] features for:
    *   `Feed`: Manages the live stream of documents.
    *   `Reader`: A markdown viewer for displayed content.
    *   `Pairing`: Handles the [[QR Code]] scanning flow for device pairing.
    *   `Settings`: Manages user preferences like font size and device management.
*   **MarkPushClient TCA Dependency**: Provides concrete and test implementations for the `MarkPushClient` dependency.
*   **WiFiReceiver**: Employs `Network.framework` for listening to local network pushes with [[Bonjour]] advertising.
*   **CloudReceiver**: Subscribes to [[Supabase]] [[Realtime]] for receiving remote pushes.
*   **CryptoUtils**: Implements [[AES-256-GCM]] encryption/decryption and [[PBKDF2]] key derivation using [[CryptoKit]], ensuring compatibility with the CLI's `nonce||ciphertext||tag` format.
*   **KeychainManager**: Securely stores encryption keys and device IDs within the iOS Keychain.
*   **UI Components**: Includes reusable components like `DocCard`, `SourceBadge`, `TagPill`, and `ConnectionBadge`.
*   **Theme System**: Provides a consistent visual experience with defined typography, semantic colors, and spring animations.
*   **Testing**: Comprehensive [[The Composable Architecture (TCA)]] tests are included for `Feed`, `Reader`, and `Pairing` features.
*   **Package Management**: Configures `Package.swift` with all necessary Swift Package Manager (SPM) dependencies.

### Cloud Relay (Supabase)

The [[Supabase]]-based cloud relay system extends [[MarkPush]]'s reach by enabling remote push notifications:

*   **SQL Migration**: Introduces a `pushes` table with [[Role-Level Security (RLS)]], [[Realtime]] capabilities, and [[Time-To-Live (TTL)]] for data management.
*   **CLI Cloud Transport**: Implements `CloudSender` utilizing the [[Supabase]] REST API for sending pushes from the command-line interface.
*   **Auto-Transport Logic**: Configures `Transport.Select` to prioritize `WiFi` transport (2-second timeout) with a fallback to the `cloud` relay if [[Supabase]] credentials are provided and local WiFi push fails.

## Related

[[MarkPush]],[[The Composable Architecture (TCA)]],[[Supabase]],[[CryptoKit]],[[SwiftUI]],[[SwiftData]],[[KeychainManager]],[[Bonjour]],[[AES-256-GCM]],[[PBKDF2]],[[CloudSender]],[[WiFiReceiver]],[[CloudReceiver]],[[SQL migration]],[[Realtime]],[[Role-Level Security (RLS)]],[[Time-To-Live (TTL)]],[[QR scan flow]],[[Network.framework]]
