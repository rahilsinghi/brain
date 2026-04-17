---
title: EdgeMesh AI App Development for Microsoft Store with Qualcomm Support
author: ai
created_at: 2026-04-16T20:00:30.857Z
last_ai_edit: 2026-04-16T20:00:30.857Z
last_human_edit: null
last_embedded_hash: eb0fdd4086ae3d46
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/gmail/emails/re-take-your-hackathon-app-to-the-next-level-app-store-opportunity-8b35d6.md]]"
tags:
  - qualcomm
  - edgemesh ai
  - microsoft store
  - hackathon
  - snapdragon
  - app development
  - technical support
  - cloud inference
  - msix
  - bitlocker
  - device loan
  - collaboration
---


# EdgeMesh AI App Development for Microsoft Store with Qualcomm Support

This article details the collaboration between Qualcomm Developer Relations and the NYU EdgeMesh AI team to develop and publish their hackathon application to the Windows App Store. It covers the provision of Snapdragon-powered loaner devices, technical support for NPU integration and cloud inference, and the process of preparing the app for Microsoft Store certification.

## Key Concepts

[[EdgeMesh AI]],[[Qualcomm]] Developer Relations,[[Snapdragon Multiverse Hackathon]],[[Microsoft Store]] (Windows App Store),[[MSIX]] packaging,[[Cloud Inference]],[[Qualcomm AI Hub]],[[BitLocker]] recovery,Discord for technical support,Loaner devices,[[Windows Developer Partner Center]],[[Genie with QNN]],[[NPU integration]]

## Details

### Opportunity and Initial Engagement (February 2026)
Lauren Lunde from [[Qualcomm]] Developer Relations offered the NYU [[EdgeMesh AI]] team, winners of the [[Snapdragon Multiverse Hackathon]], a unique opportunity to list their application on the [[Microsoft Store]]. The goal was to have the app vetted and listed by March 31, positioning it as one of the first third-party apps developed for Snapdragon silicon. [[Qualcomm]] committed to providing resources, hands-on support, and active promotion if the app was successfully listed.

Chinmay Shringi, representing the [[EdgeMesh AI]] team, expressed keen interest but raised a critical concern: the lack of access to [[Snapdragon]] [[Windows laptops]] for ongoing testing. Lauren Lunde promptly agreed to ship loaner devices (laptop, phone, and Uno Q) to the team and introduced [[Kartikey Rawat]] and [[Shivay Lamba]] as primary technical support contacts.

### Device Setup and Technical Challenges (March 2026)
Upon receiving the devices, the team encountered a [[BitLocker]] recovery key prompt on a Windows laptop. Lauren Lunde quickly intervened, providing the necessary recovery key to unblock the team's progress. Concurrently, [[Qualcomm]] initiated the setup of a private Discord channel to facilitate ongoing technical discussions and support.

A meeting on March 4, 2026, involved the [[EdgeMesh AI]] team ([[Rahil Singhi]], [[Chinmay Shringi]], Manav Parikh, [[Bharath Mahesh Gera]], [[Sariya Khan]], and faculty advisor [[Alon Hillel-Tuch]]) and [[Qualcomm]] representatives ([[Kartikey Rawat]], [[Shivay Lamba]], Paul Torres, Derrick Johnson). The team provided an overview of [[EdgeMesh AI]] – a peer-to-peer distributed LLM system using [[Qualcomm]]-accelerated models, [[gRPC streaming]], and [[WebRTC]], with a [[Go server]], [[WinUI 3]]/.NET Windows client (using [[MSIX]] packaging), [[Flutter]] mobile frontend, and [[Kotlin]] backend components. They confirmed successful multi-device testing across macOS, Windows (Snapdragon X Elite), and Android.

Key technical issues identified included:
*   A model versioning problem during the hackathon where model pulls failed due to a compiled-model vs. runtime version mismatch when using [[Genie with QNN]].
*   The need for [[Cloud Inference]] credits for testing the cloud inference pipeline.

**Qualcomm's Action Items from the meeting:**
*   [[Kartikey Rawat]] to share an [[MSIX]] sample repository and app manifest guidance.
*   [[Kartikey Rawat]] to check with Lauren Lunde on developer-portal coupon codes for the [[Windows Developer Partner Center]].
*   [[Kartikey Rawat]] / [[Shivay Lamba]] to inquire about additional [[Qualcomm AI Hub]] cloud inference tokens for demo/testing.
*   [[Kartikey Rawat]] to follow up with engineering on the compiled-model vs. runtime mismatch.
*   [[Kartikey Rawat]] / [[Shivay Lamba]] to confirm feasibility of mobile app distribution support (Flutter for iOS/Android).
*   [[Kartikey Rawat]] to coordinate Discord channel creation with the marketing team.

Chinmay confirmed a need for approximately $100 in cloud credits for testing and proposed a $50-per-user free tier coupon system for the application's users.

### Device Return and Shipping Coordination (April 2026)
By April 14, 2026, Lauren Lunde requested the return of the loaner devices for an upcoming hackathon. Chinmay confirmed the [[EdgeMesh AI]] app was fully built, tested, and proceeding through [[Microsoft]] certification, asking for a return shipping label. Lauren informed the team that [[Qualcomm]] could not provide a shipping label but offered to cover shipping costs by providing a credit card number to the store clerk over the phone. She also mentioned that [[Qualcomm]] was actively working with [[Microsoft]] to resolve an issue faced by Chinmay, demonstrating continued support even as the project concluded its device loan phase.

## Related

[[EdgeMesh AI]],[[Qualcomm]],[[Snapdragon Multiverse Hackathon]],[[Microsoft Store]],[[MSIX]],[[Cloud Inference]],[[Qualcomm AI Hub]],[[BitLocker]],[[Chinmay Shringi]],[[Lauren Lunde]],[[Kartikey Rawat]],[[Shivay Lamba]],[[Alon Hillel-Tuch]],[[Sariya Khan]],[[Add Open Matter for Bharath Mahesh Gera (Karen Project)]],[[Add Open Matter for Rahil Singhi (Karen Project)]],[[Windows Developer Partner Center]],[[Microsoft]],[[Discord]],[[Genie with QNN]],[[Go server]],[[WinUI 3]],[[Flutter]],[[Kotlin]],[[gRPC streaming]],[[WebRTC]],[[Windows laptops]],[[NPU integration]]
