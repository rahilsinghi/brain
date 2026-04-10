---
title: "feat: Backend Core — FastAPI App, Pydantic Models, Docker Image"
author: ai
created_at: 2026-04-10T02:23:39.263Z
last_ai_edit: 2026-04-10T02:23:39.263Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-backend-core-fastapi-app-pydantic-models-docker-imag-c9999f.md]]"
tags:
  - fastapi
  - pydantic
  - docker
  - backend
  - karen
  - weasyprint
  - sse
  - pdf-generation
  - python
  - cors
  - api
  - models
---

# feat: Backend Core — FastAPI App, Pydantic Models, Docker Image

This commit establishes the core backend infrastructure for the Karen project, introducing a FastAPI application with CORS support, health check endpoint, and router registration. Pydantic models are defined for key domain entities including members, escalations, channels, personalities, and SSE event types. A Python 3.13-slim Docker image is configured with WeasyPrint system dependencies to support PDF generation.

## Key Concepts

- **FastAPI Application**: Entry point configured with CORS middleware, a health check route, and modular router registration
- **Pydantic Models**: Strongly-typed data models covering members, escalations, channels, personalities, and all Server-Sent Events (SSE) event types
- **Dockerization**: Python 3.13-slim base image with system-level dependencies for WeasyPrint installed
- **WeasyPrint**: PDF generation library requiring system dependencies, integrated into the Docker build
- **SSE (Server-Sent Events)**: Event types modeled via Pydantic for real-time streaming communication
- **CORS Middleware**: Cross-Origin Resource Sharing configuration to allow controlled API access from frontend clients

## Details

## Overview

Commit `112eba0` by Rahil Singhi on 2026-04-04 lays the foundational backend layer for the **Karen** project. The change introduces 347 lines of new code across 8 files with no deletions, representing a greenfield backend scaffold.

## FastAPI Application

The entry point sets up the FastAPI application instance with:
- **CORS middleware** to handle cross-origin requests, enabling frontend integration
- A **health check endpoint** for uptime monitoring and container orchestration readiness probes
- **Router registration** to organize routes modularly across domain areas

## Pydantic Models

Data validation and serialization are handled through Pydantic models defined for the following domain entities:
- **Members**: User or participant data structures
- **Escalations**: Models representing escalation events or workflows
- **Channels**: Communication channel definitions
- **Personalities**: Configuration or behavioral profile models
- **SSE Event Types**: Typed models for all Server-Sent Events, enabling type-safe real-time streaming

## Docker Configuration

The service is containerized using a **Python 3.13-slim** base image. System-level dependencies required by **WeasyPrint** (a Python PDF generation library) are installed within the image, enabling server-side PDF rendering capabilities.

## File Change Summary

| Metric | Value |
|---|---|
| Files Changed | 8 |
| Additions | +347 |
| Deletions | 0 |
| Author | Rahil Singhi |
| Date | 2026-04-04 |
| SHA | `112eba0` |

## Related

- [[Karen Project]]
- [[FastAPI Configuration]]
- [[Pydantic Data Models]]
- [[Docker Infrastructure]]
- [[WeasyPrint PDF Generation]]
- [[Server-Sent Events (SSE)]]
- [[CORS Middleware]]
- [[Rahil Singhi]]
