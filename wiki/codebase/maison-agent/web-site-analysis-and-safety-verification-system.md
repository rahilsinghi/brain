---
title: Web Site Analysis and Safety Verification System
author: ai
created_at: 2026-04-17T02:21:30.446Z
last_ai_edit: 2026-04-17T02:21:30.446Z
last_human_edit: null
last_embedded_hash: 3e123e5afe409684
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-36.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 36
---


# Web Site Analysis and Safety Verification System

This code community implements a site analyzer tool that detects web frameworks, validates URL safety, and performs comprehensive website analysis within the maison-agent project. It includes test suites for both tool functionality and API route validation.

## Key Concepts

- Website framework detection,- URL safety validation,- IP address analysis,- Site analysis API endpoint testing,- Private network IP detection

## Details

The Web Site Analysis and Safety Verification system is implemented in `site-analyzer.ts` and includes comprehensive testing in both `tools.test.ts` and `routes/tools.test.ts`. The core functionality includes:

- **Framework Detection**: Implements `detectFramework()` to identify web frameworks used by target sites
- **Safety Validation**: Uses `isSafeUrl()` with IP validation through `isPrivateIP()` to prevent local network exposure
- **Site Analysis**: Core `analyzeSite()` function orchestrates complete website characterization
- **Test Coverage**: Includes both unit tests for individual functions and integration tests for API endpoints

The system integrates with the [[maison-agent]] API infrastructure and depends on authentication modules from [[community 0]]. Key files include:

- `site-analyzer.ts` - Main implementation of website analysis logic
- `site-analyzer.test.ts` - Unit tests for individual analysis functions
- `tools.test.ts` - Integration tests for API endpoint behavior
- `tools.test.ts` - Additional test suite for route validation

## Related

[[maison-agent]],[[community 0]],[[auth]]
