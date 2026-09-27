# fio-basic-boilerplate — Agent Context

> Next.js 16 boilerplate starter by Satya Wikananda.

## What this project is

`fio-basic-boilerplate` (v0.0.1) is a Next.js starter / boilerplate, not a shipped product. The home page
self-describes as **"Fio Next.js Starter Template"** and `src/lib/seo/index.ts` calls it
**"Fio Boilerplate"** — those names refer to the same project. Don't try to "unify" them
yet; pick one voice when the project matures.

The intent is a foundation for future work that already wires up: a landing page, a
client-side data demo, a server-side data demo, a live color picker, an animated
star background, theme switching, and SEO metadata. None of these are finished.

## Status: Work in Progress

This is a scaffold with several known rough edges. Read this before "cleaning up":

- **All work is uncommitted.** The only commit so far is `5d32e95 feat: initial commit`
  (with the old `app/` layout). Everything in `src/` is WIP and unsaved to history.
- **Duplicate theme-toggle files** in `src/components/base/`:
  `app-toggle-button-icon-theme.tsx` and `app-toggle-select-icon-theme.tsx` are older
  duplicates of what `app-toggle-theme.tsx` already exports. Don't add a third variant.
- **Placeholder constant**: `src/shared/constant/index.ts` is just `export const foo = 'bar'`.
  Don't build features that depend on it.
- **Unused CSS**: `src/styles/colors.css` defines 20 palette helpers, but `ColorPicker`
  uses inline OKLCH values from `_modules/constants/colors.ts` instead. Don't auto-import
  it.
- **Two lockfiles committed**: both `pnpm-lock.yaml` and `bun.lockb` are present.
  Pick the one the user runs and don't regenerate the other.
- **Palette churn**: the brand primary recently moved from sky blue to clover green
  (`oklch(0.65 0.15 145)`); expect more palette changes.

## Tech stack

- **Framework**: Next.js 16 (App Router, `--webpack` flag, RSC enabled)
- **Runtime**: React 19 / TypeScript 5.9 strict
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss` — tokens live in `src/styles/globals.css`
- **UI primitives**: shadcn/ui — style `radix-luma`, base color `zinc`, icons `lucide`
  (see [components.json](components.json))
- **State / data**: TanStack Query 5 (server state) + Zustand 5 (with `persist`)
- **Other**: Motion 12 (animations) · `next-themes` (light/dark/system) · `@bprogress/next` (top loader)
- **Fonts** (via `next/font/google`): `font-sans` (DM Sans), `font-heading` (Figtree), `font-mono` (Geist Mono)
- **Path aliases**: `@/*` → `./src/*`, `~/*` → `./public/*`

## Routes

All routes are demo pages, not real product surfaces:

- `/` — landing page with three navigation CTAs
- `/components` — color-picker demo (mutates primary CSS vars live, persists to localStorage)
- `/demo/react-query` — client-side news fetch (CNN/RSS via `ofetch` + TanStack Query)
- `/demo/server-side` — server-side Pokemon fetch (PokeAPI via RSC)

Page-specific code lives under `_modules/` next to each route. Don't promote it to
`src/components/` or `src/lib/` unless reuse is needed.

## Where things live

```
src/
├── app/                          # routes
├── components/
│   ├── base/                     # app-level UI (typography, image fallback, theme toggles)
│   ├── ui/                       # shadcn primitives (button, card, select, skeleton, tooltip)
│   ├── provider/                 # ReactQueryProvider, BprogressProvider
│   └── background/               # StarsBackground, StarParticles, ShootingStars
├── lib/
│   ├── api/                      # BaseApi class + per-domain APIs (news, …)
│   ├── seo/                      # getSEOTags() metadata builder
│   └── utils.ts                  # cn()
├── stores/                       # Zustand stores (e.g. color.store.ts)
├── hooks/                        # custom hooks
├── shared/{constant,assets}/     # shared constants and asset imports
├── styles/                       # globals.css (Tailwind v4 entry), colors.css (unused)
└── @types/                       # global types (e.g. api.d.ts)

<route>/_modules/{components,utils,constants,hooks,types}/   # page-local code
```

For **code-style rules** (`cn()`, `cva` variants, `React.forwardRef` + `displayName`,
the full `_modules/` pattern, provider wiring, font tokens), read
[`.claude/AGENTS.md`](.claude/AGENTS.md). This file is the "what is this project"
doc; that one is the "how to write code here" doc.

## Before you write code

1. **Read `.claude/AGENTS.md`** for the project's conventions.
2. **Skim installed skills** under `.claude/skills/` and `.agents/skills/`
   (`ui-ux-pro-max`, `shadcn`, `next-best-practices`, `tanstack-query`,
   `framer-motion-animator`, `accessibility`, `emil-design-eng`,
   `design-taste-frontend`, `simplify`) and invoke the relevant one before designing.
3. **Default new local code to `_modules/`** under the owning route. Only extract
   to `src/components/`, `src/lib/`, etc. when there's cross-page reuse.
4. **Don't invent files that don't exist.** There is no real backend, no auth, no
   database, no env vars, no API keys. Don't scaffold them.
5. **Honour the WIP state.** Don't auto-fix the landmines listed above unless the
   user explicitly asks.