---
title: Console Application Router Architecture
author: ai
created_at: 2026-04-17T03:56:13.539Z
last_ai_edit: 2026-04-17T03:56:13.539Z
last_human_edit: null
last_embedded_hash: 8cc61a15f61f21b2
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-37.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
aliases:
  - Community 37
---


# Console Application Router Architecture

This code community implements the routing infrastructure for the Maison Agent console application, handling URL pattern matching, navigation, and route registration. The router forms the foundation for client-side navigation within the console interface.

## Key Concepts

- Client-side routing framework implementation,- URL pattern-to-regex conversion system,- Route registration and management API,- Navigation dispatch mechanism,- Testable router reset capabilities,- Base path stripping utilities

## Details

The router module at `/apps/console/src/router.ts` implements a comprehensive routing system for the Maison Agent console application. It contains the core routing logic with multiple interconnected functions:

- **Route registration** (`router_registerroute`): Manages adding new routes to the routing table
- **Pattern compilation** (`router_patterntoregex`): Converts URL patterns to regular expressions for matching
- **Navigation handling** (`router_navigate`): Manages client-side navigation between routes
- **Route dispatch** (`router_dispatch`): Executes route handlers based on current URL
- **Initialization** (`router_initrouter`): Sets up the routing system
- **Test utilities** (`router_resetrouterfortests`): Provides test isolation by resetting the router state
- **Path utilities** (`router_stripbase`): Normalizes URLs by removing base paths

The router forms the foundation for the console application's navigation system, enabling features like dynamic route matching and client-side transitions without full page reloads. The module's design emphasizes testability through its reset functionality and clear separation of concerns between different routing operations.

## Related

[[Console Application Core Architecture]],[[Console Application Client-Side Routing]],[[maison-agent]]
