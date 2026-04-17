---
title: AWS ECS Agent and Quality Service Infrastructure
author: ai
created_at: 2026-04-15T20:04:20.045Z
last_ai_edit: 2026-04-15T20:04:20.045Z
last_human_edit: null
last_embedded_hash: c1d33e254dbd67a2
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-19.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 19
---



# AWS ECS Agent and Quality Service Infrastructure

This code community defines, deploys, and tests the core infrastructure for the `maison-agent` application on AWS Elastic Container Service (ECS). It encapsulates the setup for the main agent server and a dedicated quality service, integrating centralized logging via FireLens to Loki.

## Key Concepts

AWS Elastic Container Service (ECS),Infrastructure as Code (IaC),Container Orchestration,Centralized Logging,FireLens,Loki,Service Deployment,Infrastructure Testing

## Details

This community is responsible for managing the AWS infrastructure essential for deploying and operating various components of the `[[maison-agent]]` application. It primarily focuses on defining and testing [[AWS Elastic Container Service (ECS)]] stacks and their associated resources.

Key files and their roles:

*   `/infra/lib/agent-server-ecs-stack.ts`: This file defines the [[AWS Elastic Container Service (ECS)]] stack specifically for the main agent server. It likely configures the necessary task definitions, services, and associated networking and scaling policies to ensure the agent's robust operation.
*   `/infra/lib/quality-ecs-stack.ts`: This file defines a separate [[AWS Elastic Container Service (ECS)]] stack dedicated to a "quality" service. This suggests a distinct component responsible for tasks such as quality assurance, monitoring, or performance metrics within the `maison-agent` ecosystem.
*   `/infra/lib/helpers/firelens.ts`: This helper module provides reusable logic for configuring [[FireLens]] within the ECS task definitions. The internal relationships confirm that it integrates with [[Loki]] (`firelens → firelens_addfirelenstoloki`) to ensure centralized collection and management of logs from both the agent server and the quality service.
*   `/infra/test/agent-server-ecs-stack.test.ts`, `/infra/test/quality-ecs-stack.test.ts`, and `/infra/test/helpers/firelens.test.ts`: These test files are crucial for validating the infrastructure definitions. They include unit and integration tests to ensure that the ECS stacks and [[FireLens]] configurations are correctly specified and will function as expected upon deployment, maintaining the integrity of the infrastructure.

These infrastructure components are ultimately integrated into the broader `[[agent_infrastructure]]` (Community 1) module, which orchestrates their overall deployment and management within the `maison-agent` system.

## Related

[[maison-agent]],[[agent_infrastructure]],[[AWS Elastic Container Service (ECS)]],[[FireLens]],[[Loki]],[[Agent Core Message Handling Test Suite]]
