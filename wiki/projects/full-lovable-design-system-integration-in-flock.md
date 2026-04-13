---
title: Full Lovable Design System Integration in Flock
author: ai
created_at: 2026-04-12T21:44:16.807Z
last_ai_edit: 2026-04-12T21:44:16.807Z
last_human_edit: null
last_embedded_hash: 12383754e857fe7f
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-full-lovable-design-system-integration-blue-primary-g-2810ea.md]]"
tags:
  - design system
  - ui/ux
  - frontend
  - visual design
  - flock
  - three.js
  - shadcn
  - css
  - react
---


# Full Lovable Design System Integration in Flock

This update introduces a comprehensive "Lovable" design system to the Flock project, characterized by a blue primary color, glass panel effects, and a void aesthetic with ambient glows. It overhauls the visual identity across all major pages and incorporates new frontend dependencies for advanced UI capabilities.

## Key Concepts

Lovable Design System,Blue Primary Color,Glass Panel Effects,Void Aesthetic,Ambient Glows,Space Grotesk Font,Three.js Integration,shadcn/ui,Tailwind CSS

## Details

The `rahilsinghi/Flock` repository received a significant design system overhaul (SHA: `3008f74`) on 2026-03-21. This update introduced a "Lovable" design system, drastically changing the project's visual identity.

Key changes implemented in `globals.css` include:
-   **Color Palette**: The primary color was shifted from gold to a vibrant blue (`hsl 210 100% 65%`). New "Roam glow tokens" were established in blue, teal, amber, rose, and violet for consistent glow effects.
-   **Visual Effects**: New `glass panel` and `glass-panel-subtle` utility classes were added to create frosted glass effects throughout the UI.
-   **Backgrounds**: "Void radial backgrounds" with a blue ambient glow were introduced to establish a deep, immersive aesthetic.
-   **Typography**: The display font was updated to `Space Grotesk`, replacing Cormorant, for a modern look.
-   **Text Styling**: A `text-luminous` class was added for glowing text, alongside specific glow effects like `glow-blue`, `glow-teal`, `glow-amber`, and `glow-rose`.
-   **UI Elements**: Custom scrollbars were designed to align with the new void aesthetic.

All existing pages were updated to reflect this new design:
-   **Login Page**: Now features a blue ambient glow, glass card inputs, and a blue Call-to-Action (CTA).
-   **Preference Page**: Displays a blue completeness ring, blue tags, and `glass-panel-subtle` cards.
-   **Admin Page**: Incorporates `glass-panel` cards, a blue CTA, and a teal start button.
-   **Phone Room**: Utilizes a `void-deep` background, glass lobby cards, and blue glow text.
-   **Agent Colors**: Aligned with HSL values from the new "roam glow system" for consistent theming.

New dependencies were added to support these advanced UI capabilities and future integrations:
-   `@react-three/fiber`
-   `@react-three/drei`
-   `three` (in preparation for Three.js sphere integration)
-   `clsx`
-   `tailwind-merge`
-   `class-variance-authority`
-   `lucide-react` (anticipating future `shadcn` integration)

## Related

[[Flock Project]],[[Design System]],[[Three.js]],[[shadcn/ui]]
