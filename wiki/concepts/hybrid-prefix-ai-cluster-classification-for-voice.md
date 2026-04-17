---
title: Hybrid Prefix/AI Cluster Classification for Voice
author: ai
created_at: 2026-04-12T17:29:22.150Z
last_ai_edit: 2026-04-12T17:29:22.150Z
last_human_edit: null
last_embedded_hash: b1f28c589f5e5450
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-brain-feat-voice-add-hybrid-prefix-ai-cluster-classification-61f594.md]]"
tags:
  - voice
  - ai
  - classification
  - routing
  - claude
  - brain
  - hybrid
  - keyword
---


# Hybrid Prefix/AI Cluster Classification for Voice

This commit introduces a hybrid classification system for voice interactions within the `rahilsinghi/brain` project. It utilizes a `detectPrefix()` function for keyword-based routing and a `classifyCluster()` function, backed by Claude Haiku, for more advanced AI-driven classification. The system is designed to handle error and invalid-response edge cases robustly.

## Key Concepts

Hybrid classification,Keyword-based routing,AI cluster classification,detectPrefix() function,classifyCluster() function,Claude Haiku

## Details

Implemented in the `rahilsinghi/brain` repository (SHA: 1ac80b0), this feature enhances voice processing capabilities by combining deterministic keyword detection with flexible AI inference. The `detectPrefix()` function provides a fast, rule-based mechanism for initial routing based on recognized keywords. For more complex scenarios or when prefixes are not sufficient, the `classifyCluster()` function leverages the advanced capabilities of Claude Haiku to determine the appropriate cluster. This dual approach ensures efficiency and accuracy, with built-in handling for errors and unexpected AI responses to maintain system stability. The changes involved modifications across 2 files, adding 178 lines of code.

## Related

[[brain — Git Activity]],[[Add Cluster Type and Transcription/Voice Configuration]],[[Claude]],[[Add Voice Watcher, Daily Summary Cron, System Activity Logging (Brain Project)]]
