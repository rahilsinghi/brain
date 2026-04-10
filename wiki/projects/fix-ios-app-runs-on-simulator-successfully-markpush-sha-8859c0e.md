---
title: "Fix: iOS App Runs on Simulator Successfully (MarkPush SHA 8859c0e)"
author: ai
created_at: 2026-04-10T02:44:22.044Z
last_ai_edit: 2026-04-10T02:44:22.044Z
last_human_edit: null
last_embedded_hash: 396773d67062f8a5
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-markpush-fix-ios-app-runs-on-simulator-successfully-2ef9d2.md]]"
tags:
  - ios
  - swift
  - simulator
  - bugfix
  - markpush
  - entitlements
  - info-plist
  - swiftdata
  - xcodegen
  - cloudkit
  - rahil-singhi
---


# Fix: iOS App Runs on Simulator Successfully (MarkPush SHA 8859c0e)

This commit resolves several iOS simulator compatibility issues in the MarkPush app, including missing bundle ID errors, ModelContainer initialization, and entitlement conflicts. The fix spans 7 files with 56 additions and 26 deletions, authored by Rahil Singhi on 2026-03-17. Key changes include correcting Info.plist bundle keys, removing incompatible multicast entitlements, and improving error handling in CloudReceiver.

## Key Concepts

- **Bundle ID Configuration**: Added required `CFBundleIdentifier` and other bundle keys to `Info.plist` to resolve 'Missing bundle ID' simulator install errors
- **ModelContainer Initialization**: Introduced explicit `ModelContainer` init with proper error handling in `MarkPushApp`
- **Entitlement Compatibility**: Removed multicast entitlement which is incompatible with a free Apple developer team account
- **CloudReceiver Error Handling**: Switched to `subscribeWithError` and suppressed unused `try` warnings
- **project.yml Cleanup**: Removed multicast entitlement reference and explicitly set `INFOPLIST_FILE` path

## Details

## Overview

Commit `8859c0e` in the `rahilsinghi/MarkPush` repository addresses a series of issues preventing the iOS app from running on the simulator. The changes touch 7 files, adding 56 lines and removing 26.

## Changes Breakdown

### Info.plist
- Added all required bundle keys including `CFBundleIdentifier`
- Resolves the 'Missing bundle ID' error encountered during simulator installation

### MarkPushApp
- Replaced implicit `ModelContainer` initialization with an explicit init block
- Added proper error handling to surface `ModelContainer` setup failures gracefully

### Entitlements
- Removed the multicast entitlement
- Multicast networking entitlements are restricted and incompatible with free Apple developer team accounts, causing simulator build/install failures

### CloudReceiver
- Updated subscription call to use `subscribeWithError` variant for better error propagation
- Added suppression for unused `try` expression compiler warning

### project.yml
- Removed multicast entitlement entry to align with the updated entitlements file
- Explicitly set the `INFOPLIST_FILE` build setting to ensure the correct plist is referenced during builds

## Impact

After this fix, the MarkPush iOS app installs and runs successfully on the iOS simulator, unblocking local development and testing workflows.

## Related

- [[MarkPush iOS App]]
- [[iOS Simulator Debugging]]
- [[Info.plist Configuration]]
- [[SwiftData ModelContainer]]
- [[Apple Developer Entitlements]]
- [[CloudKit Subscriptions]]
- [[XcodeGen project.yml]]
- [[Free Apple Developer Account Limitations]]
