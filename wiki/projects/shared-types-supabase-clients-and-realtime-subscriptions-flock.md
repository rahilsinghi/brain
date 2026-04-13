---
title: Shared Types, Supabase Clients, and Realtime Subscriptions (Flock)
author: ai
created_at: 2026-04-12T21:38:02.422Z
last_ai_edit: 2026-04-12T21:38:02.422Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-shared-types-supabase-clients-and-realtime-subscriptio-2ec267.md]]"
tags:
  - supabase
  - realtime
  - typescript
  - frontend
  - flock
  - client
  - ssr
  - types
---

# Shared Types, Supabase Clients, and Realtime Subscriptions (Flock)

This commit introduces core architectural components for the Flock project's frontend, including shared TypeScript types for data models, dedicated Supabase client instances for server-side rendering (SSR) and browser environments, and real-time subscription functionalities. These elements are crucial for enabling interactive features and data synchronization within the application.

## Key Concepts

Shared Types,Supabase Clients,Realtime Subscriptions,Server-Side Rendering (SSR),Browser Client,Participant (Flock),Session (Flock),TripDecision (Flock)

## Details

This implementation, part of Aishwarya's deliverables for the Flock project frontend, establishes foundational components for data management and real-time updates. The `types.ts` file consolidates all shared interfaces, such as `Participant`, `Session`, and `TripDecision`, ensuring type consistency across the application. Two distinct Supabase client instances are provided: `supabase-server.ts` for SSR environments, handling cookies and service role operations, and `supabase-client.ts` for browser-side interactions.

Key to the real-time capabilities, the `realtime/session.ts` module includes functions for subscribing to updates for `Participants`, `Sessions`, and `Proposals`. These subscriptions are complemented by typed mapper functions to ensure data integrity upon reception.

## Related

[[Flock Project]],[[Supabase]],[[Realtime Subscriptions]],[[Client-Side Rendering (CSR)]],[[Server-Side Rendering (SSR)]],[[Type Definitions]],[[Flock Data Models]],[[Aishwarya Session Prompt Update – Flock Backend State Snapshot]]
