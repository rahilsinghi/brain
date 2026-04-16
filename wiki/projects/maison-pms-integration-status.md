---
title: Maison PMS Integration Status
author: ai
created_at: 2026-04-15T19:15:40.398Z
last_ai_edit: 2026-04-15T19:15:40.398Z
last_human_edit: null
last_embedded_hash: 6bdddefee560ed2b
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/api/articles/maison-slack-pms-integration-pms-connectivity-status-1776280520735.md]]"
tags:
  - maison
  - pms
  - integration
  - maison
  - status
  - hospitality
  - travel tech
  - security
  - process
  - api
  - certification
---




# Maison PMS Integration Status

This article details the status of various Property Management System (PMS) integrations for Maison, including certifications and progress updates for systems like Cloudbeds, Mews, and StayNTouch. It also covers a critical security note regarding PMS configuration exposure and outlines the integration deployment process.

## Key Concepts

PMS Integration,Certification Status,ARI (Availability, Rates, Inventory),API Limitations,Security Vulnerabilities,Prompt Injection Risk,Staging Environment,Production Environment

## Details

## PMS Integration Status

### [[Cloudbeds]] — CERTIFIED
*   Marketplace listing live
*   Handles ARI (availability, rates, inventory)
*   Supports packages, blackout dates
*   Currency handling verified
*   Disconnect flow documented

### [[Mews]] — CERTIFIED (March 31)
*   Certification confirmed by email
*   [[Javed]] handling implementation
*   Issues: rate retrieval pagination (default Count=10), need to filter Private and AvailabilityBlock rates
*   Limitation: only 3 months of UpdatedUtc range per [[API]] call
*   Pilot properties: Haltia Lake Lodge, Hotel Le Concorde Quebec, Stanton, Victorian, Arthur, Mogotel

### [[StayNTouch]] — In Progress
*   URL update deployed to [[Production Environment|prod]]
*   Working on second pilot (Sound View Greenport)
*   [[Javed]] and [[Sandeep]] maintaining

### [[Opera Cloud]] — In Progress
*   Need tenant-specific URL (maisonlabs.ohip.oraclecloud.com)
*   [[Javed]] handling. [[Fredrik Sjoberg]] asked for certification update by EOD (April 14)

### [[Think Reservations]] — Planning
*   Main PMS used by [[Select Registry]] (250+ hotels)
*   [[API]] docs shared: GET /api/hotels/{hotel_id}/availabilities/v2
*   client_id must be "SelectRegistry"

### [[DerbySoft]] — Exploration
*   For better ARI connectivity
*   [[API]] overview shared

### [[Apaleo]] — Certification call held
*   Not yet demo-ready

## Security Note (Feb 21, [[Sandeep]])
*   PMS config was exposed in `getMessage` [[API]] response → [[Prompt Injection]] risk
*   Config must NOT be sent to browser
*   Must be fetched during POST message call only
*   Ticket created for fix

## Process ([[Sandeep]])
*   Create PMS integrations in [[Staging Environment|STG env]] first
*   Verify everything works, then apply to [[Production Environment|prod client]]
*   Or use test client in [[Production Environment|prod]] to verify before applying to actual client

## Related

[[Apaleo]],[[Cloudbeds]],[[Fredrik Sjoberg]],[[Maison]],[[Mews]],[[StayNTouch]],[[Opera Cloud]],[[Think Reservations]],[[DerbySoft]],[[Javed]],[[Sandeep]],[[Select Registry]],[[Prompt Injection]],[[API]],[[Staging Environment]],[[Production Environment]]
