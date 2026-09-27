# Product

## Register

product

## Platform

web

## Users

Solo developers and indie hackers shipping side projects and weekend prototypes. They clone starters to skip yak-shaving — wiring, design tokens, deployment — and care less about audit trails than about velocity. They read code; they will skim the home page once, then jump straight into the routes to see whether the starter actually works.

## Product Purpose

Give a developer a Next.js foundation that already looks like the landing page they meant to ship. The starter proves itself by being runnable: TanStack Query wired, Cloudflare-ready, a live color system, a tabbed component inventory, and demo routes that exercise the data-fetching paths. Success looks like a visitor going from "let me check this out" to `git clone` inside five minutes, and the cloned repo already feeling like a project rather than a scaffold.

## Positioning

Ready-to-fork, opinionated defaults — the starting point is already shaped (color system, typography, motion, layout patterns, page examples), so you ship the landing page, not the foundation.

## Brand Personality

Warm, mechanical, opinionated. The voice is quietly opinionated: the starter makes choices for you and is friendly about it. Reads in the Stripe Press / Geist Software neighborhood — machinery that respects the reader, not the SaaS-cream orthodoxy and not the terminal-as-costume reflex.

## Anti-references

Avoid the **SaaS-cream / SaaS-blue gradient trap**: no cream or sand body backgrounds, no "ABOUT / PROCESS / PRICING" eyebrow above every section, no identical icon + heading + text feature grids.

Avoid the **editorial-magazine reflex**: Fio is a starter, not a magazine — no display-serif + ruled-columns Klim pastiche, no italic Fraunces drop caps.

Avoid the **SaaS template-grid reflex**: no infinite row of identical cards, no nested cards, no glassmorphism-as-default, no gradient text.

Avoid the **terminal/developer-tool reflex**: monospace is welcome where it earns its place (code, metadata), but not as costume; Fio is friendly to non-terminal users too.

## Design Principles

- **Practice what you preach** — the starter itself should be the most polished thing in its category. Opinionated defaults have to actually look like opinionated defaults.
- **Show, don't tell** — every claim on the home page should be visible somewhere on a route. TanStack Query wired → `/demo/react-query`. Cloudflare-ready → visible in the build config. Live color system → the picker actually drives the UI.
- **Inventory, not showcase** — `/components` demos real prop combinations and prop edge cases, not curated hero shots.
- **Friendly machinery** — sharp grid and predictable layout (the mechanical part) paired with warm defaults and a mascot (the warm part). Earn trust where it's mechanical; earn attention where it's warm.
- **Defaults you can leave in place** — opinionated, but the opinion is a starting point. The color system is committed but swappable; the typography is locked but readable; the page modules are examples, not mandates.

## Accessibility & Inclusion

WCAG 2.2 AA — body text 4.5:1, large text 3:1, visible focus rings on every interactive element, full keyboard navigation, no information conveyed by color alone.