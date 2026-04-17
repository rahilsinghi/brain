---
title: Dockerized Client Folder Model
author: ai
created_at: 2026-04-17T16:33:32.521Z
last_ai_edit: 2026-04-17T16:33:32.521Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/v0-content-layer-dockerized-client-folder-model-1776443484196.md]]"
tags:
  - docker
  - client-folder
  - hotel-agent
  - filesystem
  - ai-model
  - version-control
---

# Dockerized Client Folder Model

The Dockerized Client Folder Model defines a standardized filesystem structure for each hotel, serving as a self-contained knowledge base for AI agents. Every hotel has its own directory with schemas, media, provenance, and agent configurations, ensuring consistent and verifiable data management.

## Key Concepts

- **Hotel as Agent**: Each hotel is represented as an autonomous agent with a dedicated filesystem.,- **Canonical JSON Data**: All hotel information is stored in structured JSON files, ensuring a single source of truth.,- **Markdown Generation**: Human-readable markdown is auto-generated from JSON for visual inspection and agent readability.,- **Provenance Tracking**: Every data field is linked to its source, confidence level, and verification timestamp.,- **Version Control**: Git is used for tracking changes in V0, while S3 versioning is used for large-scale deployments.,- **Admin Console Integration**: Operators can manage hotel data through a visual interface that writes directly to JSON files.

## Details

The Dockerized Client Folder Model establishes a standardized filesystem layout for each hotel, acting as a self-contained knowledge base for AI agents. Each hotel is represented as an agent with its own directory containing schemas, media, provenance, and agent configurations. This structure ensures consistent and verifiable data management.

### Canonical Folder Layout
Each hotel directory contains subfolders for `data/`, `markdown/`, `media/`, `provenance/`, `skills/`, `tools/`, and `.meta/`. The `data/` folder holds the primary JSON files (e.g., `hotel.json`, `rooms.json`) that define the hotel's properties. The `markdown/` folder contains auto-generated human-readable summaries of the JSON data. The `media/` folder stores thumbnails and a manifest mapping filenames to media IDs. The `provenance/` folder tracks the source, confidence, and verification of each data field. The `skills/` folder contains hotel-specific agent workflows, and the `tools/` folder holds integrations with external systems like PMS and Stripe. The `.meta/` folder contains internal tracking data.

### CLAUDE.md - Agent System Prompt
Each hotel has a `CLAUDE.md` file that serves as the agent's system prompt, auto-generated from the JSON data. It defines the hotel's personality, rules, available tools, and skills. This ensures the agent remains grounded in the hotel's specific context.

### Markdown Generation
Markdown files are auto-generated from JSON data, providing a human-readable format for operators and agents. These files include timestamps and links to other hotel data for navigation. Operators should edit the JSON files directly, not the markdown.

### Media Manifest
The `media/manifest.json` file maps local filenames to media IDs, including CDN URLs for full-sized images and videos. Only thumbnails are stored locally, with full media hosted on a CDN.

### Provenance Files
Provenance files track the source, confidence, and verification of each data field. The `sources.json` file logs the source of each field, while `last-scrape.json` and `conflicts.json` provide metadata on the latest scraper run and detected contradictions.

### Skills Folder
The `skills/` folder contains hotel-specific agent workflows, allowing hotels to customize agent behavior. These workflows are written in markdown and define how the agent handles tasks like checking availability or recommending experiences.

### Tools Folder
The `tools/` folder holds integrations with external systems, such as PMS and Stripe. These integrations are populated during onboarding and are essential for managing bookings and payments.

### Version Control
In V0, Git is used to track changes to hotel directories, with each normalizer run committing updates. For large-scale deployments (V1+), S3 versioning is used, with change logs stored in DynamoDB.

### Admin Console Integration
The admin console provides a visual interface for operators to manage hotel data. It allows for browsing, editing, and verifying data, as well as resolving conflicts and uploading media.

This model ensures that the hotel's data is always verifiable, consistent, and accessible, making it an effective foundation for AI agents and operators alike.

## Related

[V0 Content Layer — Master Architecture](./README.md),[Schema Specifications](./schemas.md),[Storage Architecture](./storage.md),[Integration](./integration.md),[Media Layer](./media-layer.md)
