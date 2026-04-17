---
title: Local Health Check Lambda Testing
author: ai
created_at: 2026-04-15T20:07:27.836Z
last_ai_edit: 2026-04-15T20:07:27.836Z
last_human_edit: null
last_embedded_hash: e5895e0c2e948581
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-136.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - health-check
  - lambda
  - testing
  - javascript
  - infrastructure
aliases:
  - Community 136
---



# Local Health Check Lambda Testing

This code community is dedicated to providing local testing capabilities for the health-check [[Lambda Function]] within the `maison-agent` infrastructure. Its primary purpose is to enable developers to verify the functionality of the health check locally before deployment, ensuring system stability and reliability.

## Key Concepts

Health Check Lambda,Local Testing Utility,JavaScript Testing Script,Infrastructure Assets

## Details

This community centers around the `test-local.js` script, located at `/Users/rahilsinghi/Desktop/maison-agent/infra/assets/health-check-lambda/test-local.js` within the [[maison-agent]] repository. This script serves as a crucial utility for locally testing the health-check [[Lambda Function]]. The internal relationship `test_local` → `test_local_runtest` indicates that the main testing script (`test_local`) invokes a specific function (`test_local_runtest`) to execute the actual health check logic. This setup allows developers to simulate the execution environment of the Lambda locally, facilitating rapid iteration and debugging without the overhead of cloud deployments. It ensures that the health check mechanism operates as expected, contributing to the overall robustness of the `maison-agent` system.

## Related

[[maison-agent]],[[Lambda Function]]
