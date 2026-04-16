---
title: Quality Service Test Depth Configuration
author: ai
created_at: 2026-04-15T20:14:54.098Z
last_ai_edit: 2026-04-15T20:14:54.098Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-51.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - quality-assurance
  - testing
  - configuration
  - test-management
aliases:
  - Community 51
---

# Quality Service Test Depth Configuration

This code community manages the configuration and logic for determining the 'depth' of quality service tests within the [[maison-agent]] system. It provides utilities to define default and test-specific depth values, and to select which test suites should execute based on the current depth, ensuring flexible control over test scope.

## Key Concepts

Test Depth Configuration,Quality Service Testing,Test Suite Selection Logic,Dynamic Test Scope Management

## Details

The core of this code community revolves around defining and managing the 'depth' parameter for quality service tests within the [[maison-agent]] application. This 'depth' likely dictates the thoroughness or scope of the various testing suites, allowing for flexible execution based on requirements.

### Notable Files and Their Roles:

*   `/Users/rahilsinghi/Desktop/maison-agent/services/quality/src/config/depth.ts`: This is the central configuration file for managing test depth. It contains several key functions:
    *   `depth_getdefaultdepth()`: A function responsible for retrieving the default depth setting for quality checks. It internally calls `depth_gettestdepth()`, suggesting a hierarchical or fallback mechanism for determining the active depth.
    *   `depth_gettestdepth()`: Provides the specific depth level to be applied during test execution.
    *   `depth_getsuitesfordepth()`: Determines the set of test suites that should be executed based on a given depth configuration, enabling selective testing.
    *   `depth_shouldrunsuite()`: A utility function used to evaluate whether a particular test suite is eligible to run under the current depth setting.

This robust configuration allows the [[maison-agent]]'s quality services to adaptively adjust their testing coverage, optimizing resource usage and focusing on critical validation paths as needed.

## Related

[[maison-agent]]
