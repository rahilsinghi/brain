---
title: Maison Environments & URLs
author: ai
created_at: 2026-04-15T19:13:21.334Z
last_ai_edit: 2026-04-15T19:13:21.334Z
last_human_edit: null
last_embedded_hash: a836b137c767c20d
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-notion-environments-urls-complete-reference-1776280299849.md]]"
tags:
  - maison
  - maison
  - environments
  - urls
  - local development
  - staging
  - production
  - deployment
  - secrets management
  - public domains
  - api
  - console
  - login
  - docs
  - status
  - quality
---




# Maison Environments & URLs

This article outlines the various environments and associated URLs for Maison services, including Test, Staging, and Production. It also details the local development ports for different services and describes the deployment pipeline and infrastructure configuration practices. Additionally, it lists the public domains utilized by Maison.

## Key Concepts

Service URLs,Deployment Environments,Local Development Ports,Deployment Pipeline,Infrastructure Configuration,Secrets Management,Public Domains

## Details

Maison organizes its services across several distinct environments: Test, Staging, and Production, each with dedicated URLs. For local development, specific ports are allocated to various services to facilitate concurrent operation.

## Service URLs by Environment

| Service | Test | Staging | Production |
|---|---|---|---|
| API | api.test.maison-labs.com | api.stg.maison-labs.com | api.maison-labs.com |
| Console | console.test.maison-labs.com | console.stg.maison-labs.com | console.maison-labs.com |
| Login | login.test.maison-labs.com | login.stg.maison-labs.com | login.maison-labs.com |
| Docs | docs.test.maison-labs.com | docs.stg.maison-labs.com | docs.maison-labs.com |
| Status | status.test.maison-labs.com | status.stg.maison-labs.com | status.maison-labs.com |
| Quality | quality.test.maison-labs.com | quality.stg.maison-labs.com | quality.maison-labs.com |

## Local Development Ports

For local development, the following ports are used by various Maison services:

| Port | Service |
|---|---|
| 8081 | Chat window |
| 8082 | Demo hotel sites |
| 8083 | API (public) |
| 8087 | Operator console |
| 8090 | Quality dashboard |
| 8091 | Docs |
| 8092 | Login |
| 8089 | Status page |
| 8583 | API (internal, VPC-only) |
| 8585 | A2UI Renderer (internal) |
| 8586 | LLM service (internal) |
| 8581 | Langfuse |

## Deployment Pipeline

The standard deployment progression for Maison services is:

`local` → `dev` → `test` → `stg` → `prod`

Infrastructure configuration is managed through a hierarchical system:
*   `infra/config/default.json` — Contains the complete base configuration, serving as the baseline for the `test` environment.
*   `infra/config/stg.json` — Provides overrides specific to the `staging` environment.
*   `infra/config/prod.json` — Provides overrides specific to the `production` environment.

Secrets, such as API keys and credentials, are securely managed via [[AWS Secrets Manager]] and are injected into the containerized services during startup.

## Public Domains

Maison utilizes several public domains for its web presence:
*   **maison.cx** — The public-facing business and marketing website.
*   **maison-labs.com** — Hosts all platform tooling and services.
*   Chat widgets are embedded directly onto **client hotel websites**.

## Related

[[Maison Labs]],[[AWS Secrets Manager]],[[Deployment Pipeline]],[[Local Development]],[[Environments]],[[API]]
