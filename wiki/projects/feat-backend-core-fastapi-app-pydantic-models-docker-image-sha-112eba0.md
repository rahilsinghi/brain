---
title: "feat: Backend Core — FastAPI App, Pydantic Models, Docker Image (SHA 112eba0)"
author: ai
created_at: 2026-04-10T02:23:41.936Z
last_ai_edit: 2026-04-10T02:23:41.936Z
last_human_edit: null
last_embedded_hash: 062b04839b176b80
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-karen-feat-backend-core-fastapi-app-pydantic-models-docker-imag-c9999f.md]]"
tags:
  - fastapi
  - pydantic
  - docker
  - python
  - backend
  - karen
  - sse
  - weasyprint
  - pdf-generation
  - cors
  - api
  - models
  - python-3.13
---


# feat: Backend Core — FastAPI App, Pydantic Models, Docker Image (SHA 112eba0)

This commit establishes the foundational backend infrastructure for the Karen project, introducing a FastAPI application with CORS support, health checks, and router registration. It defines Pydantic models covering members, escalations, channels, personalities, and SSE event types. A Python 3.13-slim Docker image is configured with WeasyPrint system dependencies to support PDF generation.

## Key Concepts

- **FastAPI Entry Point:** Core application setup including CORS middleware, a health check endpoint, and modular router registration
- **Pydantic Models:** Strongly-typed data models for members, escalations, channels, personalities, and all Server-Sent Events (SSE) event types
- **Docker Image:** Python 3.13-slim base image configured with WeasyPrint system-level dependencies for PDF rendering
- **WeasyPrint Integration:** System dependencies included at the Docker layer to enable server-side PDF generation
- **SSE Event Types:** Structured models for all Server-Sent Events, enabling real-time streaming communication patterns
- **CORS Configuration:** Cross-Origin Resource Sharing middleware applied at the application level to support frontend integration

## Details

## Overview

Commit `112eba0` in the `rahilsinghi/karen` repository lays the groundwork for the Karen project's backend. Authored by Rahil Singhi on 2026-04-04, this commit introduces 347 lines of new code across 8 files with no deletions, representing a greenfield backend scaffolding effort.

## FastAPI Application

The FastAPI entry point is configured with:
- **CORS middleware** to allow cross-origin requests, enabling frontend clients to communicate with the API
- **Health check endpoint** for liveness and readiness probing, useful in containerized and orchestrated environments
- **Router registration** following a modular pattern, allowing feature-specific routers to be attached to the main application

## Pydantic Models

A comprehensive set of Pydantic models is introduced to enforce data validation and serialization across the application domain:

| Model Domain | Purpose |
|---|---|
| Members | Represents user or agent membership data |
| Escalations | Models escalation events and their metadata |
| Channels | Defines communication channel structures |
| Personalities | Captures personality configuration for agents or personas |
| SSE Event Types | Typed models for all Server-Sent Events payloads |

## Docker Image

The Dockerfile uses a **Python 3.13-slim** base image to keep the container footprint minimal. System-level dependencies are installed to support **WeasyPrint**, a Python library that converts HTML/CSS to PDF documents. This setup enables server-side PDF generation as part of the Karen platform's feature set.

## Change Statistics

- **Files changed:** 8
- **Additions:** +347
- **Deletions:** -0
- **Author:** Rahil Singhi
- **Date:** 2026-04-04T13:30:21Z

## Related

- [[Karen Project]]
- [[FastAPI Application Architecture]]
- [[Pydantic Data Models]]
- [[Docker Containerization]]
- [[WeasyPrint PDF Generation]]
- [[Server-Sent Events (SSE)]]
- [[CORS Middleware Configuration]]
- [[Rahil Singhi]]
