---
title: Distributed Telemetry and LLM Observability
author: ai
created_at: 2026-04-15T20:16:12.190Z
last_ai_edit: 2026-04-15T20:16:12.190Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-10.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 10
---

# Distributed Telemetry and LLM Observability

This code community is responsible for implementing distributed telemetry, tracing, and observability across the Maison Agent application. It provides core tracing utilities, HTTP request middleware, and specific integrations for monitoring LLM interactions with OpenAI and Gemini via Langfuse. The community also includes a Grafana plugin for visualizing and managing this telemetry data and health checks.

## Key Concepts

Distributed Tracing,Telemetry,Observability,HTTP Request Tracing,LLM Call Tracing,Langfuse Integration,Health Checks,Grafana Plugin

## Details

This community focuses on providing comprehensive observability for the [[maison-agent]] system. It encompasses tools for distributed tracing, health monitoring, and specialized tracking of Large Language Model (LLM) interactions.

### Core Components:

*   **`packages/telemetry/src/tracer.ts`**: This is the central file for managing tracing activities, offering functions like `getTracer`, `injectTraceHeaders`, `startSpan`, and `withSpan` to instrument various operations across the application. It also includes `withBrowserSpan` for client-side tracing, supported by `packages/browser-telemetry/src/tracer.ts`.
*   **`packages/telemetry/src/middleware/http.ts`**: Implements `httpTraceMiddleware` to automatically inject and extract trace context from HTTP requests, ensuring end-to-end request tracing.
*   **LLM Tracing Integrations**: Specialized modules for tracking LLM calls:
    *   **`packages/telemetry/src/llm/openai.ts`**: Provides `tracedOpenAIChat` for instrumenting OpenAI API calls.
    *   **`packages/telemetry/src/llm/gemini.ts`**: Provides `tracedGeminiChat` for instrumenting Gemini API calls.
    *   **`packages/telemetry/src/llm/langfuse.ts`**: Integrates with Langfuse, an open-source observability solution for LLMs, used by both OpenAI and Gemini tracing modules to capture detailed prompt, response, and cost data. It includes `getLangfuseClient` and `getPrompt`.
*   **`packages/telemetry/src/health.ts`**: Contains utilities such as `recordHealthCheck` and `createHealthCheckSpan` to monitor the health and operational status of various services.
*   **`plugins/grafana-maison-app/pkg/plugin/app.go`**: A Grafana application plugin, likely used for visualizing telemetry data, setting up alerts, and providing a dashboard for the collected metrics and traces. This plugin interacts with other core functionalities, importing from `http` (middleware), `context` (from [[Context Management Utilities]]), `agent_inject` (from [[Agent Client Database Definition]]), and `auth` (from [[API Authentication and Secure Tooling]]).

### Test Coverage:

*   **`packages/telemetry/test/tracer.test.ts`**: Unit tests for the core tracing functionality.
*   **`packages/telemetry/test/middleware/http.test.ts`**: Tests for the HTTP tracing middleware.
*   **`packages/telemetry/test/health.test.ts`**: Tests for the health check utilities.

### External Interactions:

This community's tracing middleware (`http`) is utilized by other parts of the system, including `pinecone` (from [[Pinecone Indexing and Management]]) and `multi` (from [[Multi-Agent Orchestration Utilities]]), ensuring these components also participate in the distributed tracing. Several modules within this cluster, including `tracer`, `health`, `http`, `openai`, and `gemini`, depend on `api` utilities from [[API Authentication and Secure Tooling]]. The LLM tracing components also rely on `types` from [[A2UI Data Field Computation and Rendering Utilities]] for shared type definitions.

## Related

[[maison-agent]],[[API Authentication and Secure Tooling]],[[A2UI Data Field Computation and Rendering Utilities]],[[Agent Client Database Definition]],[[Context Management Utilities]],[[Pinecone Indexing and Management]],[[Multi-Agent Orchestration Utilities]]
