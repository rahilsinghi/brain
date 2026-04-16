---
title: Maison Platform Architecture
author: ai
created_at: 2026-04-15T19:10:07.333Z
last_ai_edit: 2026-04-15T19:10:07.333Z
last_human_edit: null
last_embedded_hash: f76d1fdfed7366b5
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-platform-architecture-local-dev-environment-1776280190023.md]]"
tags:
  - maison
  - ai
  - hospitality
  - platform
  - api
  - concierge
  - guest service
  - knowledge management
  - monitoring
  - qa
  - observability
  - agent-to-agent
  - json-rpc
  - grafana
  - playwright
  - openapi
  - fredrik sjoberg
---




# Maison Platform Architecture

Maison is an AI-powered hotel concierge platform that provides conversational guest services, knowledge management, and hospitality intelligence. Its comprehensive architecture includes a suite of applications for managing clients, knowledge bases, and analytics, alongside robust APIs supporting A2A and MCP protocols. The platform is backed by a professional monitoring stack using Grafana and automated quality assurance with Playwright.

## Key Concepts

AI-powered hotel concierge,Conversational guest service,Knowledge management,Hospitality intelligence,[[A2A Protocol]] (Agent-to-Agent communication),[[MCP Protocol]] (Machine Communication Protocol),[[OpenAPI]] specification,[[Grafana]] for observability,[[Playwright]] for automated QA

## Details

# Maison Platform Architecture

The Maison platform, accessible at `local.maison-labs.com`, is an AI-powered hotel concierge system designed to enhance guest services, manage hospitality knowledge, and provide intelligent insights.

## Applications

The platform comprises several core applications:

| App | Description | URL |
|-----|-------------|-----|
| Console | Manage clients, knowledge bases, analytics, and configuration | `/console/` |
| Login | Sign in, reset passwords, accept invitations | `/login` |
| Documentation | API reference, quickstart guides, widget SDK, and integration docs | `docs.local.maison-labs.com` |
| Status | Service health, uptime, and incident timeline | `status.local.maison-labs.com` |
| Quality Dashboard | Playwright test sessions, pass rates, and trend analysis | `quality.local.maison-labs.com` |
| Brand Styleguide | Colors, typography, voice, and component patterns | `/brand` |
| Dashboard | Grafana observability dashboards, metrics, and tracing | `dashboard.local.maison-labs.com` |
| Demo | Interactive demo of Maison conversational AI guest service | `local.maison.cx` |

## API and Machine Endpoints

The platform exposes several API and machine endpoints for external and internal communication:

| Endpoint | Protocol |
|----------|----------|
| `/openapi.json` | OpenAPI 3.1 specification |
| `/.well-known/agent.json` | A2A agent card for agent-to-agent discovery |
| `/a2a` | A2A JSON-RPC 2.0 endpoint |
| `/mcp` | MCP streamable HTTP transport |
| `/api` | REST API |
| `/health` | Health check |

## Key Observations

During a review of the Maison platform, several key architectural and operational features were noted:

*   **[[MCP Protocol]] Endpoint**: The platform includes its own MCP endpoint, indicating potential for direct integration with other systems, such as connecting [[Claude]] directly to Maison's APIs.
*   **[[A2A Protocol]] Support**: Built-in support for Agent-to-Agent (A2A) communication facilitates inter-agent discovery and interaction, highlighting its extensible design.
*   **Professional Monitoring**: Utilizes [[Grafana]] for robust observability, including dashboards, metrics, and tracing, ensuring a professional monitoring stack.
*   **Automated QA**: Employs [[Playwright]] for automated testing, indicated by the Quality Dashboard, signifying a strong focus on test infrastructure and reliability.
*   **Comprehensive API Documentation**: The availability of an [[OpenAPI]] specification (`/openapi.json`) ensures full and accessible documentation for all API endpoints, simplifying integration efforts.

**Source:** Screenshot of `local.maison-labs.com`, captured during Fredrik's screen share, April 15, 2026.

## Related

[[Call Preparation for Maison and Fredrik Sjoberg]],[[Claude]],[[Grafana]],[[Playwright]],[[OpenAPI]],[[A2A Protocol]],[[MCP Protocol]]
