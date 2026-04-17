---
title: Email Subscription Management Utility
author: ai
created_at: 2026-04-15T19:53:02.661Z
last_ai_edit: 2026-04-15T19:53:02.661Z
last_human_edit: null
last_embedded_hash: 3fd9811857394cd7
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/graphify/maison-agent/maison-agent-community-26.md]]"
tags:
  - code-community
  - maison-agent
  - graphify
  - email
  - subscription
  - utility
  - backend
aliases:
  - Community 26
---



# Email Subscription Management Utility

This code community is dedicated to managing email subscriptions within the [[maison-agent]] project. It provides a robust `SubscriptionManager` class to handle subscriber lifecycle, including subscription, unsubscription, status checks, and the handling of hard bounces.

## Key Concepts

Email Subscription,Subscriber Management,Unsubscribe Token Generation,Hard Bounce Handling,Singleton Pattern (for manager instance)

## Details

This community centers around the `SubscriptionManager` class, found primarily in `/packages/email-utils/src/subscription-manager.ts`. This utility is responsible for the complete lifecycle of email subscriptions.

Key components and their roles:

*   `/packages/email-utils/src/subscription-manager.ts`: The core file containing the `SubscriptionManager` class and related functions. It exposes methods for:
    *   `subscribe()`: To add a new subscriber.
    *   `unsubscribe()`: To remove an existing subscriber, often facilitated by a token.
    *   `isSubscribed()`: To check the current subscription status of an email.
    *   `getSubscriber()`: To retrieve subscriber details.
    *   `generateUnsubscribeToken()`: Creates a unique token for secure unsubscription links, ensuring that only authorized requests can unsubscribe a user. This token generation explicitly calls `subscribe` if the user is not found, suggesting a 'subscribe before unsubscribe' workflow or ensuring a valid state for token generation.
    *   `markHardBounce()`: Records when an email address consistently fails delivery, preventing future attempts to send emails to it.

*   `initSubscriptionManager()` and `getSubscriptionManager()`: These functions suggest the implementation of a [[Singleton Pattern]] for the `SubscriptionManager`, ensuring that there is only one instance of the manager throughout the application, providing a consistent state for subscription management.

*   `/packages/email-utils/test/subscription-manager.test.ts`: Contains unit tests to ensure the correctness and reliability of the subscription management logic, including the methods for subscribing, unsubscribing, and token generation.

## Related

[[maison-agent]],[[Email Utilities]],[[Singleton Pattern]]
