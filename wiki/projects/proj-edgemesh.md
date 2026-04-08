---
title: EdgeMesh – Distributed Edge Inference Mesh
author: ai
created_at: 2026-04-08T14:25:52.436Z
last_ai_edit: 2026-04-08T14:25:52.436Z
last_human_edit: null
last_embedded_hash: c0b913fdb8b1766d
sources:
  - career-datacenter/data/projects.yaml#proj_edgemesh
tags:
  - project
  - coursework
  - python
  - distributed-systems
  - api-gateway
  - health-checks
  - device-orchestration
---



# EdgeMesh – Distributed Edge Inference Mesh

**coursework** · 2024-2025 (Qualcomm project)

## Problem

Need for a local-first mesh infrastructure to register edge devices, deploy AI models, and route inference requests with observability and failover capabilities.

## Approach

Built device discovery with heartbeat-based health monitoring, model packaging/rollout system, and API gateway that dispatches inference to optimal nodes based on latency and health signals.

## Results

Functional distributed inference mesh with dynamic membership, failover-aware routing, and request tracing for debugging.

## Key Points

- Built a local-first mesh that registers edge devices, deploys AI models, and routes inference requests with lightweight observability and health checks
- Implemented device discovery + heartbeat-based health, enabling dynamic membership and failover-aware routing across nodes
- Added a model packaging + rollout flow to push versioned artifacts to devices and verify readiness before serving traffic
- Built an API gateway to dispatch inference to the best available node based on latency/health signals; included basic request tracing for debugging

## Tech Stack

Python, Distributed Systems, API Gateway, Health Checks, Device Orchestration

## Links

- [Repository](https://github.com/ChinmayShringi/distributed-computing)
