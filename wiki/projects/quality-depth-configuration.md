---
title: Quality Depth Configuration
author: ai
created_at: 2026-04-15T19:14:33.518Z
last_ai_edit: 2026-04-15T19:14:33.518Z
last_human_edit: null
last_embedded_hash: 8ff2a89c9e41492d
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-48.md]]"
tags:
  - maison
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 48
---




# Quality Depth Configuration

This code community is responsible for defining and managing the 'depth' configuration within the `maison-agent`'s quality services. It provides utilities to determine default and test depths, associate test suites with specific depths, and decide whether a test suite should execute based on the configured depth.

## Key Concepts

Test Depth,Configuration Management,Test Suite Selection,Quality Services

## Details

This community primarily revolves around the configuration of 'depth' for quality assurance processes, likely within testing or analysis contexts. The core functionality is encapsulated within a single file:

*   `services/quality/src/config/depth.ts`: This TypeScript file acts as the central configuration hub for 'depth'. It contains several key functions:
    *   `depth_getdefaultdepth`: Retrieves the default depth setting.
    *   `depth_gettestdepth`: Determines the test-specific depth, potentially overriding or deriving from the default. It is called by `depth_getdefaultdepth`.
    *   `depth_getsuitesfordepth`: Identifies and returns the relevant test suites corresponding to a given depth level.
    *   `depth_shouldrunsuite`: A utility function that evaluates whether a particular test suite should be executed based on the current depth configuration. 

This setup allows for flexible control over the scope and granularity of quality checks, enabling different levels of testing or analysis to be applied based on the desired 'depth'.

## Related

[[maison-agent]]
