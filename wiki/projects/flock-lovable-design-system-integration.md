---
title: Flock Lovable Design System Integration
author: ai
created_at: 2026-04-10T21:23:32.124Z
last_ai_edit: 2026-04-10T21:23:32.124Z
last_human_edit: null
last_embedded_hash: e8406bbec350d634
sources:
  - "[[/Users/rahilsinghi/Desktop/brain/raw/github/commits/rahilsinghi-flock-feat-full-lovable-design-system-integration-blue-primary-g-2810ea.md]]"
tags:
  - design system
  - ui/ux
  - frontend
  - react
  - css
  - tailwind css
  - three.js
  - shadcn
  - design tokens
  - aesthetic
  - void
  - glassmorphism
  - rahil singhi
  - flock
  - ai-assisted
  - commit
---


# Flock Lovable Design System Integration

This commit introduces a comprehensive integration of the "Lovable" design system into the Flock project, marked by a significant shift to a blue primary color, glass panel elements, and a void aesthetic. It overhauls the visual identity across all application pages, replacing older design elements with a modern, consistent look. The update also adds new dependencies in preparation for advanced UI features like Three.js and Shadcn/ui.

## Key Concepts

- [[Lovable Design System]],- Blue Primary Color,- Glass Panel Aesthetic (Glassmorphism),- Void Aesthetic,- Roam Glow Tokens,- Space Grotesk Font,- Text-luminous Effect,- [[Three.js]],- [[Shadcn/ui]]

## Details

This feature commit (`feat: 3008f74`) by [[Rahil Singhi]] on 2026-03-21 integrates the 'Lovable' design system across the `rahilsinghi/Flock` repository, involving 10 file changes with substantial additions (+947) and deletions (-632).

### Design System Overhaul (Affecting `globals.css`)

*   **Color Palette:**
    *   Primary color shifted from gold to a new blue (HSL 210 100% 65%).
    *   Introduced "Roam glow tokens" with specific colors: blue, teal, amber, rose, and violet.
*   **Aesthetics & Components:**
    *   New `glass panel` and `glass-panel-subtle` utility classes for UI elements, reflecting a glassmorphism style.
    *   Implemented `void radial backgrounds` with an accompanying blue ambient glow.
    *   `Text-luminous` utility for glowing text effects, supported by specific `glow-blue`, `glow-teal`, `glow-amber`, and `glow-rose` effects.
    *   Custom scrollbars designed to match the overall void aesthetic.
*   **Typography:**
    *   Adopted `Space Grotesk` as the primary display font, replacing the previous Cormorant font.

### Page-Specific Updates

All core application pages were updated to reflect the new design system:

*   **Login Page:** Features a blue ambient glow, glass card inputs, and blue Call-to-Action (CTA) buttons.
*   **Preference Page:** Updated with a blue completeness ring, blue tags, and `glass-panel-subtle` cards.
*   **Admin Page:** Utilizes `glass-panel` cards, blue CTA buttons, and a distinct teal start button.
*   **Phone Room:** Implemented a `void-deep` background, glass lobby cards, and blue glow text.
*   **Agent Colors:** HSL values for agent-specific colors were updated to align with the new Roam glow system.

### New Dependencies

Several new dependencies were added, indicating preparation for future advanced UI and 3D graphics features:

*   **3D Graphics & React Integration:** `@react-three/fiber`, `@react-three/drei`, and `three` (in preparation for `[[Three.js]]` sphere integration).
*   **UI Utilities:** `clsx`, `tailwind-merge`, and `class-variance-authority` (often used together for robust UI component styling, common in `[[Shadcn/ui]]` implementations).
*   **Icons:** `lucide-react`.

### Co-Authorship

This commit was co-authored by `[[Claude Opus 4.6]] (1M context)`, indicating AI assistance in its development.

## Related

[[Flock]],[[Rahil Singhi]],[[Three.js]],[[Shadcn/ui]],[[Claude Opus 4.6]]
