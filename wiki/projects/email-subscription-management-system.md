---
title: Email Subscription Management System
author: ai
created_at: 2026-04-15T20:03:09.244Z
last_ai_edit: 2026-04-15T20:03:09.244Z
last_human_edit: null
last_embedded_hash: null
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-28.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - email-management
  - subscription
  - utility
aliases:
  - Community 28
---

# Email Subscription Management System

This code community encapsulates the core logic for managing email subscriptions within the `maison-agent` project. It provides functionalities for subscribing, unsubscribing, checking subscriber status, and handling related operations like generating unsubscribe tokens and marking hard bounces.

## Key Concepts

Email Subscription Management,Subscriber Lifecycle,Unsubscribe Token Generation,Hard Bounce Handling,Subscriber Status Tracking,Email Utility Package

## Details

The `Email Subscription Management System` is primarily defined within the `email-utils` package, focusing on the `SubscriptionManager` class and its associated methods.

### Notable Files:

*   `/packages/email-utils/src/subscription-manager.ts`: This is the central file for the community, containing the `SubscriptionManager` class and its core logic. It defines how subscribers are managed, including their status and interaction with the system.
    *   `SubscriptionManager`: The main class responsible for managing email subscriptions. Its constructor likely initializes necessary dependencies or state.
    *   `initSubscriptionManager`: A function responsible for initializing the `SubscriptionManager` instance, possibly following a singleton pattern.
    *   `getSubscriptionManager`: Provides access to the initialized `SubscriptionManager` instance.
    *   `isSubscribed(subscriberId)`: Checks if a given subscriber is currently active.
    *   `subscribe(subscriberInfo)`: Adds or updates a subscriber's information, marking them as subscribed.
    *   `unsubscribe(token)`: Marks a subscriber as unsubscribed, typically using a unique token.
    *   `generateUnsubscribeToken(subscriberId)`: Creates a secure token that allows a subscriber to easily opt-out. Notably, the internal graph indicates this method potentially calls `subscribe`, suggesting a workflow where token generation might involve re-confirming or updating subscription status.
    *   `getSubscriber(subscriberId)`: Retrieves detailed information about a specific subscriber.
    *   `markHardBounce(subscriberId)`: Flags a subscriber's email as having caused a 'hard bounce', which usually leads to automatic unsubscription or removal to protect sender reputation.

*   `/packages/email-utils/test/subscription-manager.test.ts`: This file contains unit tests for the `SubscriptionManager` module, ensuring the reliability and correctness of the subscription management functionalities.

This community forms a fundamental part of any email-based communication strategy within `[[maison-agent]]`, ensuring proper handling of user subscriptions and compliance.

## Related

[[maison-agent]],[[Email Subscriber Database Migrations]],[[Email Subscription Management Utility]],[[email-utils]]
