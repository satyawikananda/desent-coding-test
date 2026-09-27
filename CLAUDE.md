# fio-basic-boilerplate — Claude Code Context

> Next.js 16 boilerplate starter by Satya Wikananda.

## What this project is

`fio-basic-boilerplate` (v0.0.1) is a Next.js starter / boilerplate, not a shipped product. The home page
self-describes as **"Fio Next.js Starter Template"** and `src/lib/seo/index.ts` calls it
**"Fio Boilerplate"** — those names refer to the same project. Don't try to "unify" them
yet; pick one voice when the project matures.

The intent is a foundation for future work that already wires up: a landing page, a
client-side data demo, a server-side data demo, a live color picker, an animated
star background, theme switching, and SEO metadata. None of these are finished.

This file deliberately overlaps with [AGENTS.md](AGENTS.md) on the intro / status / tech
sections — both files are read in different contexts, so each should stand on its own.
Where this file goes further: Claude-Code-specific operational rules (skills, harness
config, tool-specific footguns).

## Status: Work in Progress

For the canonical landmine list, see [AGENTS.md § Status](AGENTS.md#status-work-in-progress).
The Claude-specific addition is: **don't auto-fix those landmines** unless the user
explicitly asks. Treat them as intentional WIP state.

Quick recap of what *not* to touch on your own: the `dskadosak` string on line 61 of
`src/app/page.tsx`, the duplicate theme-toggle files, the `foo = 'bar'` placeholder in
`src/shared/constant/index.ts`, the unused `src/styles/colors.css`, and the dual
lockfile situation (`pnpm-lock.yaml` + `bun.lockb`).

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

## Claude-Code specifics

### Skills available here

This project ships 10 skills under `.claude/skills/` (with mirrors under
`.agents/skills/`). **Invoke the relevant one via the Skill tool BEFORE writing code**
when a task matches its scope:

- `ui-ux-pro-max` — UI/UX design decisions, styling, component architecture
- `shadcn` — working with shadcn/ui, adding new primitives
- `next-best-practices` — RSC boundaries, App Router, data fetching, metadata
- `tanstack-query` — server state, data fetching
- `framer-motion-animator` — animations, page transitions, micro-interactions
- `accessibility` — WCAG compliance, keyboard nav, screen reader support
- `emil-design-eng` — UI polish, component design, invisible details
- `design-taste-frontend` — anti-template / anti-slop frontend guidance
- `simplify` — code review, quality improvement, efficiency

### Conventions live in `.claude/AGENTS.md`

That file owns code-style rules: `cn()` usage, `cva` variants, `React.forwardRef` +
`displayName`, the full `_modules/` pattern, font tokens, provider wiring, and the
work-flow checklist. Read it before editing. This root `CLAUDE.md` covers "what the
project is"; `.claude/AGENTS.md` covers "how to write code here".

### Harness config snapshot

- `.claude/settings.local.json` is in use — check it for the project's active
  permission allowlist before running `pnpm` / `bun` / `next` / `shadcn` so Claude
  does not over-prompt.
- `.claude/AGENTS.md` is the project-scoped rules file Claude reads automatically —
  if you need to change conventions, edit it there, not here.
- No project-level `.mcp.json` is present. **Do not invent MCP servers.**
- The user's global `~/.claude/CLAUDE.md` references `RTK.md` (Rust Token Killer);
  that's the user's token-saving CLI, not a project concern.

### Things that surprise Claude here

- **`next dev --webpack` is intentional.** The project opts out of Turbopack. Don't
  "modernize" by removing the flag.
- **RSC is on.** Default to server components and use `"use client"` sparingly. Use
  `next-best-practices` for placement.
- **Tailwind v4 syntax** — no `tailwind.config.ts`; tokens live in `globals.css`. The
  `shadcn` skill knows this — defer to it.
- **`lucide-react` alias** — a `lucide-react@1.11.0` alias is pinned for shadcn
  compatibility. Don't bump it without confirming.
- **Multiple lockfiles** (`pnpm-lock.yaml` + `bun.lockb`). Verify which the user runs
  before invoking package commands. Do not regenerate the "other" one.
- **Cloudflare deployment is signalled but not configured.** There is no `wrangler`
  or `@opennextjs/cloudflare` config yet. If asked to "deploy", surface that as a
  missing prerequisite instead of improvising.

### Plan mode + subagents

- In plan mode, you can write to the designated plan file (the harness tells you the
  path). Outside plan mode, you can edit any file normally.
- For exploratory multi-area work on a WIP this small, prefer a single `deep-research`
  pass over spawning many subagents — the codebase is small enough that one sweep
  usually beats parallel fan-out.

### Don't do (Claude-specific)

- **Do not run `npx shadcn add` autonomously** — it mutates `components.json` and edits
  `src/styles/globals.css`. Confirm first.
- **Do not `git init` / `git add` / `git commit`** — the repo is uncommitted by
  choice. Leave work in the working tree.
- **Do not auto-fix the WIP landmines** listed in
  [AGENTS.md § Status](AGENTS.md#status-work-in-progress) unless the user explicitly
  asks. They are intentional signals, not bugs to clean up.
