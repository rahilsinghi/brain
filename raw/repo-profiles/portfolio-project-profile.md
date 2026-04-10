---
status: pending
source_type: file_drop
source_id: null
ingested_at: 2026-04-10T12:30:00Z
parsed_at: 2026-04-10T12:30:00Z
compiled_to: null
processed_at: null
retry_count: 0
last_error: null
compile_progress: null
---

# Rahil Singhi — Portfolio Website: Project Profile

## Project Summary

Personal SWE/ML portfolio website built with Next.js 15 (App Router) and TypeScript. Targets full-time SWE and ML engineering roles, plus founding engineer opportunities. Core positioning: "I ship production systems. Some of them think for themselves." Features interactive knowledge graph visualization, AI-powered terminal chat with RAG, GitHub project ticker, hackathon showcase, and multimedia experience timeline. Currently deployed on Vercel (Hobby tier). Status: Production-ready with ongoing content enrichment and feature refinements. Domain: rahilsinghi.com (pending via Cloudflare Registrar).

## Tech Stack

**Framework & Runtime:** Next.js 16.1.6, React 19.2.3, TypeScript 5 (strict mode), Node.js  
**Styling:** Tailwind CSS v4, CSS custom properties for theme management, PostCSS  
**Animations & Interactions:** Framer Motion (client-side), D3.js 7.9.0 (canvas-rendered force simulations), custom scroll velocity hooks  
**AI/ML:** Gemini Embedding API (`gemini-embedding-001`) for terminal RAG, cosine similarity for semantic search  
**APIs:** GitHub API with PAT (server-side fetching, 12hr cache), Formspree (contact form), Google Fonts (Outfit, JetBrains Mono), Vercel Analytics & Speed Insights  
**Build & Deployment:** Vercel (automatic), ESLint 9, pnpm monorepo setup  
**Browser Support:** Chrome, Firefox, Safari (text layout accuracy benchmarked via pretext submodule)

## Architecture

**Server Components (default):** All content sections render as static HTML — Hero, Projects, Experience, Education, About, Contact, Resume. Reduces hydration complexity and improves Core Web Vitals.

**Client Components (selective):** Navigation, Theme Provider/Toggler, Knowledge Graph (D3.js with canvas), Terminal Chat (RAG endpoint), Cursor effects, Scroll velocity, Keyboard shortcuts. Marked with `'use client'` pragma.

**Data Flow:** Content lives in `/src/content/*.ts` (single source of truth). GitHub API fetches repos server-side with selective enrichment for featured projects. Terminal RAG uses pre-embedded chunks (built at compile time) and cosine similarity ranking. Knowledge graph queries both embedded nodes and links from `/src/content/skills.ts`.

**Rendering Strategy:**
- Server fetch → static HTML (Projects Ticker, Experience, Education)
- Client hydration → interactive overlays (Theme, Nav, Cursor, Dots)
- Canvas rendering → Knowledge Graph (D3 force simulation, mouse tracking)
- Floating widgets → Terminal Chat, Keyboard Shortcuts

## Directory Structure

```
/src
├── app/
│   ├── page.tsx           # Main entry, composes all sections
│   ├── layout.tsx         # Root layout, fonts, metadata, theme flash prevention
│   ├── globals.css        # Tailwind config, CSS vars (dark/light), custom animations
│   ├── not-found.tsx      # 404 with glitch effect + auto-redirect
│   ├── robots.ts          # SEO
│   ├── sitemap.ts         # SEO
│   └── api/
│       ├── chat/route.ts  # RAG chat endpoint (rate-limited, semantic search)
│       └── og/route.tsx   # Dynamic Open Graph image generation

├── components/            # 43 files, all section & interactive components
│   ├── Hero.tsx                 # Hero section (100vh stacked headline)
│   ├── HackathonProjects.tsx    # 6-project showcase (Karen, Flock, EdgeMesh, Coro, MarketPulse, Ask NYC)
│   ├── ProjectsTicker.tsx       # GitHub repo carousel (infinite scroll, enriched cards)
│   ├── Experience.tsx           # Work history (Kismet 2x, Krushal) with metrics sidebar
│   ├── Education.tsx            # NYU '26 + SSN College timeline
│   ├── KnowledgeGraph.tsx       # D3.js force-directed skill graph (canvas, 100+ nodes)
│   ├── LinkedInPosts.tsx        # LinkedIn feed integration
│   ├── About.tsx                # Bio, headshot, Instagram link
│   ├── Contact.tsx              # Formspree email form
│   ├── Nav.tsx                  # Sticky navigation with theme toggle
│   ├── TerminalChat.tsx         # Floating chat widget (bottom-right)
│   ├── ThemeProvider.tsx        # Theme context + localStorage persistence
│   ├── ScrollProgress.tsx       # Page scroll indicator bar
│   ├── SectionDots.tsx          # Keyboard nav overlay (⌘+1-8)
│   ├── Marquee.tsx              # Bottom ticker (keyword scroll)
│   ├── CircuitDivider.tsx       # 3-variant section dividers (procedural SVG)
│   ├── GlitchReveal.tsx         # Glitch text effect (easter egg comments)
│   ├── PretextBackground.tsx    # Text layout submodule background
│   ├── ClientSections.tsx       # Barrel export of client-only components
│   ├── hero/                    # Hero sub-components (HeroParallax, CodeTypingBg)
│   └── [misc visual fx]         # CursorGlow, CustomCursor, TiltCard, MagneticButton, ScrollReveal, etc.

├── content/                 # Content data (never hardcoded)
│   ├── meta.ts              # Site config, nav links, social links, headline
│   ├── projects.ts          # Hackathon project metadata + types
│   ├── experience.ts        # Work history entries (Kismet, Krushal)
│   ├── education.ts         # Degree programs + courses
│   ├── skills.ts            # 100+ skill nodes + edges (graph structure)
│   ├── terminal.ts          # Terminal commands + RAG content chunks
│   ├── bio.ts               # About section text
│   ├── linkedin.ts          # LinkedIn post data
│   └── overrides.ts         # GitHub project enrichments (featured highlights)

├── lib/
│   ├── github.ts            # GitHub API client (fetch + enrich ticker projects)
│   ├── embeddings.ts        # Gemini embedding client (semantic search, cosine similarity)
│   ├── theme-colors.ts      # Runtime color map for canvas (D3 context)
│   └── wrap-geometry.ts     # Text geometry utilities (pretext integration)

└── hooks/
    └── useScrollVelocity.ts # Detects scroll velocity for parallax effects
```

## Key Components

**Hero.tsx** (100vh viewport)  
Massive stacked headline ("I ship production systems"), status line, signature graphic, parallax scroll effects. Uses CodeTypingBg for animated background, scroll-triggered reveals.

**KnowledgeGraph.tsx** (D3 + Canvas)  
Interactive skill visualization with 100+ nodes spanning languages (Python 3, Go, TypeScript), AI/ML (PyTorch, HuggingFace, Gemini, GPT-4o), backend (FastAPI 3, NestJS 2), databases (PostgreSQL, BigQuery, Redis), cloud (Docker 2, GCP 2), and major projects as cluster nodes. Canvas-rendered force simulation with mouse tracking. Theme-aware colors (green accent in dark, deep green in light).

**ProjectsTicker.tsx**  
Infinite-scroll carousel of GitHub repositories fetched server-side. Displays repo name, language with color coding, star count, NEW badge (7-day cutoff), and enriched cards for featured projects (wider, with images). Procedurally generated art per card. Hover lift effect.

**HackathonProjects.tsx**  
6-project showcase with card selector and detail expansion. Projects: Karen (winner, speech-to-text), Flock (distributed systems), EdgeMesh (edge networking), Coro (ML/analytics), MarketPulse (financial data), Ask NYC (city knowledge base). Each includes description, tech stack, team size, image carousel.

**TerminalChat.tsx**  
Floating chat widget (bottom-right corner, always accessible). Supports classic commands (help, clear, about) and RAG queries. Queries routed to `/api/chat` endpoint using Gemini embeddings for semantic search over portfolio content chunks. Rate-limited to 30 req/hour per IP.

**ThemeProvider.tsx + Nav.tsx**  
Context-based theme management (dark/light). Theme toggle in header. Colors stored in CSS custom properties (globals.css) for components, `theme-colors.ts` for canvas. localStorage persistence + system preference fallback.

## Features

**Animations & Visual Effects**
- Scroll-triggered staggered reveals (ScrollReveal)
- Scroll velocity parallax (useScrollVelocity hook)
- Glitch text effect (GlitchReveal, easter eggs scattered throughout)
- Tilt cards (3D perspective on hover, TiltCard)
- Magnetic buttons (MagneticButton, MagneticLink)
- Custom cursor with glow effect (CursorGlow, CustomCursor)
- Circuit-pattern section dividers (3 variants, SVG-based)
- Morphing number animations (CountUp, MorphingNumber)
- Text scramble/typewriter effects (TextScramble, CodeTypingBg)
- Binary dissolve transitions (BinaryDissolve)
- Procedural art (ProceduralArt, unique per card)
- Particle field background (ParticleField)
- Loading screen boot animation (BootScreen)
- Marquee ticker strip (bottom-right keyword scroll)

**Easter Eggs**
- Inline glitch comments: "// 50,000+ lines and counting", "// 3 startups, 0 regrets", "// this form actually works. wild, right?", "you found one. there are more."
- Keyboard shortcuts (⌘+1 through ⌘+8 for section navigation)
- 404 page with glitch animation + auto-redirect
- Animated boot screen on load (terminal-style)
- Floating terminal access from anywhere (⌘+T)

**Interactive Elements**
- Knowledge graph with hover labels and physics-based node repulsion
- ProjectsTicker with language colors and enriched card expansion
- HackathonProjects detail modal with image carousel
- Theme toggle with persistent state
- Contact form with Formspree validation
- LinkedIn feed integration
- Resume PDF download
- 404 auto-redirect timer

## Development Setup

**Prerequisites:** Node.js 18+, pnpm

**Installation:**
```bash
pnpm install
```

**Environment Variables** (.env.local):
```
GEMINI_API_KEY=<your-gemini-api-key>
GITHUB_TOKEN=<your-github-pat>
```

**Development:**
```bash
pnpm run dev
# Opens http://localhost:3000
```

**Build & Deploy:**
```bash
pnpm run build
pnpm run start
# Vercel auto-deploys on git push to main
```

**Linting:**
```bash
pnpm run lint
```

**Content Edits:** All text lives in `/src/content/*.ts`. Modify meta.ts, projects.ts, experience.ts, skills.ts, terminal.ts without touching components. Rebuild embeddings in embeddings.ts if terminal content changes.

## Current State

**Deployed:** Production live on Vercel (automatic preview + main deploys). Domain pending (rahilsinghi.com via Cloudflare).

**Completed:**
- Full Next.js 15 app with App Router
- Dark/light theme system (CSS vars + localStorage)
- Hero section with parallax
- 6-hackathon project showcase
- GitHub projects ticker with enrichment
- Experience timeline (Kismet 2x, Krushal)
- Education timeline (NYU '26, SSN College)
- Knowledge graph (D3.js, 100+ skill nodes)
- Terminal chat with RAG (Gemini embeddings)
- Formspree contact form
- LinkedIn feed integration
- Keyboard navigation (⌘+1-8)
- 40+ visual animations & effects
- Responsive design (mobile-first Tailwind)
- SEO setup (robots, sitemap, OG images)
- ESLint strict mode

**In Progress / Backlog:**
- Domain registration (Cloudflare Registrar pending)
- GitHub token generation (GITHUB_TOKEN env var not yet set)
- Performance monitoring (Vercel Speed Insights integrated)
- Content expansion (more hackathon details, project images)
- Additional resume variants (GenAI + ML specialist versions ready in /public/resumes/)

**Known Limitations:**
- Hobby tier Vercel (5 concurrent builds, 100GB/month bandwidth)
- Terminal RAG limited to 30 reqs/hour per IP
- Pretext submodule (text layout benchmarks) is reference data, not core portfolio feature
- LinkedIn feed may require occasional token refresh

---

**Latest Changes (2026-04-08):** Light/dark theme fully operational, light mode contrast optimized (darker greys, inverted ticker cards), skill graph expanded with Karen, Flock, Ask NYC, MarkPush nodes, ProjectsTicker replaces old FeaturedProjects, 6-project hackathon section live, glitch styling moved to globals.css, hydration mismatches resolved.
