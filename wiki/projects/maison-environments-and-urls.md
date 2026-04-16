---
title: Maison Environments and URLs
author: ai
created_at: 2026-04-15T19:12:36.440Z
last_ai_edit: 2026-04-15T19:12:36.440Z
last_human_edit: null
last_embedded_hash: 96d87da36b3485ca
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-notion-environments-urls-complete-reference-1776280299849.md]]"
tags:
  - maison
  - maison
  - environment
  - url
  - deployment
  - configuration
  - local development
  - aws secrets manager
  - api
  - console
  - login
  - docs
  - status
  - quality
  - langfuse
---


# Maison Environments and URLs

This article outlines the deployment environments and URL structures for Maison-Labs services, encompassing Test, Staging, and Production. It also details local development ports for various services and describes the deployment pipeline, infrastructure configuration management, and public domains associated with Maison-Labs.

## Key Concepts

Deployment Environments (Test, Staging, Production),Service URLs,Local Development Ports,Deployment Pipeline,Infrastructure Configuration Management,AWS Secrets Manager,Public Domains

## Details

Maison-Labs operates across multiple environments, each with dedicated URLs for its suite of services. Local development also utilizes a specific set of ports for various components.

## Service URLs by Environment
The following table lists the base URLs for Maison-Labs services across different environments:

| Service | Test                      | Staging                   | Production              |
|---------|---------------------------|---------------------------|-------------------------|
| API     | `api.test.maison-labs.com`| `api.stg.maison-labs.com` | `api.maison-labs.com`   |
| Console | `console.test.maison-labs.com`| `console.stg.maison-labs.com` | `console.maison-labs.com` |
| Login   | `login.test.maison-labs.com`| `login.stg.maison-labs.com` | `login.maison-labs.com` |
| Docs    | `docs.test.maison-labs.com` | `docs.stg.maison-labs.com`| `docs.maison-labs.com`  |
| Status  | `status.test.maison-labs.com` | `status.stg.maison-labs.com`| `status.maison-labs.com`|
| Quality | `quality.test.maison-labs.com`| `quality.stg.maison-labs.com` | `quality.maison-labs.com`|

## Local Development Ports
For local development, the following ports are used for various Maison-Labs services:

| Port | Service               |
|------|-----------------------|
| 8081 | Chat window           |
| 8082 | Demo hotel sites      |
| 8083 | API (public)          |
| 8087 | Operator console      |
| 8090 | Quality dashboard     |
| 8091 | Docs                  |
| 8092 | Login                 |
| 8089 | Status page           |
| 8583 | API (internal, VPC-only)|
| 8585 | A2UI Renderer (internal)|
| 8586 | [[LLM service]] (internal)|
| 8581 | [[Langfuse]]          |

## Deployment Pipeline
The standard deployment pipeline progresses through the following environments:

`local` → `dev` → `test` → `stg` → `prod`

Infrastructure configuration is managed through JSON files:
*   `infra/config/default.json` — Contains the complete baseline configuration, serving as the `test` environment's configuration.
*   `infra/config/stg.json` — Specifies overrides for the `staging` environment.
*   `infra/config/prod.json` — Specifies overrides for the `production` environment.

Secrets are handled via [[AWS Secrets Manager]] and are injected into containers during startup.

## Public Domains
The key public domains associated with Maison-Labs are:
*   **maison.cx** — The public-facing business and marketing website.
*   **maison-labs.com** — Hosts all platform tooling and services.
*   Chat widgets are embedded directly on **client hotel websites**.

## Related

[[Maison]],[[AWS Secrets Manager]],[[Deployment Pipeline]],[[LLM service]],[[Langfuse]]
