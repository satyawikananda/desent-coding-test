# monis.rent — Workspace Studio

A drag-and-drop configurator for renting fully-furnished desks. The user
arranges doodle illustrations of chairs, desks, monitors, lamps, and keyboards
on an infinite canvas, swaps each doodle into a real rental product from the
catalog, picks from preset templates, and checks out with a delivery date.

## What it does

- **Build a setup visually** — every doodle on the canvas maps to a real rental
  product (chair, desk, monitor, lamp, keyboard). Click any doodle to swap its
  variant; drag to rearrange; resize from corners.
- **Pick a starting point** — four pre-arranged templates (Founder's Oasis,
  Trading floor, Creator studio, Minimal nomad) populate the canvas in one tap
  and can be tweaked afterwards.
- **See live totals** — the floating cart rail updates weekly/monthly totals,
  shows a bundle discount badge at ≥ 3 items, and persists the selection
  across reloads.
- **Check out** — confirm delivery date, see the success state, reset back to a
  blank canvas.

## How it's built

A single-screen Next.js app. The workspace state is split between two stores
that stay in sync through a dedicated hook:

```
Zustand (cart + selected template)  ←→  useCanvasSync  ←→  tldraw (positions)
              persisted via localStorage              persisted via IndexedDB
```

- **Cart** lives in a Zustand store ([workspace.store.ts](src/app/_modules/stores/workspace.store.ts))
  — line items, applied template id, swap-popover open state.
- **Positions** live in tldraw's own store, keyed by the `monis-designer-workspace`
  persistence key ([app-canvas.tsx](src/components/base/app-canvas.tsx)).
- The two stores join on `shape.meta.instanceId === cartItem.instanceId`.
  `useCanvasSync` diffs the cart against the canvas on every change and
  reconciles in both directions, with a ref guard to prevent feedback loops.

The canvas is a single tldraw instance with `hideUi`. One custom shape util
([product-shape.tsx](src/app/_modules/shapes/product-shape.tsx)) renders each
cart item as a doodle illustration with a centered pulse indicator, a hover
tooltip showing name and weekly price, and four corner resize handles. The
swap popover ([swap-popover.tsx](src/app/_modules/components/swap-popover.tsx))
floats beside the open shape and reads the catalog filtered by category.

Product catalog data lives under [src/data/](src/data/) — five category files
(`chairs.ts`, `desks.ts`, etc.) sharing the [Item](src/data/items.type.ts)
shape. Doodle illustrations live under
[public/images/doodles/](public/images/doodles/), one webp per doodle id.

## Tech stack

| Area            | Tools                                                                |
| --------------- | -------------------------------------------------------------------- |
| Framework       | Next.js 16 (App Router, `--webpack`), React 19, TypeScript 5.9       |
| Canvas          | [tldraw](https://tldraw.com) 5.4 (custom shape util, persistence)    |
| Styling         | Tailwind CSS v4, shadcn/ui (`radix-luma`), Lucide icons              |
| State           | Zustand 5 (cart + UI flags, persisted), tldraw (positions, IndexedDB) |
| Animation       | Motion 12 (`motion/react`)                                           |
| Tooling         | Bun (lockfile), ESLint, Prettier                                     |

## Quick start

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

The catalog and doodles are static — no env vars or backend required.

## Available scripts

| Command              | Description                                  |
| -------------------- | -------------------------------------------- |
| `bun run dev`        | Start the development server with webpack    |
| `bun run build`      | Create an optimized production build         |
| `bun run start`      | Serve the production build                   |
| `bun run lint`       | Run ESLint across the project                |
| `bun run typecheck`  | Run TypeScript without emitting files        |
| `bun run format`     | Format TypeScript and TSX with Prettier      |

## Project structure

```text
src/
├── app/
│   ├── _modules/
│   │   ├── components/     Cart, popover, templates, checkout, category tabs
│   │   ├── constants/      doodles, products, templates
│   │   ├── containers/     home-container.tsx (layout shell)
│   │   ├── hooks/          use-canvas-sync (Zustand ↔ tldraw bridge)
│   │   ├── shapes/         product-shape.tsx (custom tldraw ShapeUtil)
│   │   ├── stores/         workspace.store.ts (Zustand)
│   │   ├── types/          workspace.types.ts
│   │   └── utils/          helpers.ts (product lookup, formatters)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── base/               AppCanvas (tldraw mount), theme/error/layout
│   ├── provider/           ReactQuery, Bprogress providers
│   └── ui/                 shadcn primitives (button, tooltip, …)
├── data/                   Static catalog (chairs, desks, monitors, lamps, keyboards)
├── hooks/                  Shared React hooks
├── lib/                    cn() class-name helper
├── stores/                 Cross-feature Zustand stores
└── styles/                 globals.css (Tailwind v4 entry), tldraw-overrides.css

public/
└── images/
    ├── doodles/            *.webp — one per doodle id (chair, desk-1, monitor-1, …)
    └── icons/              misc static icons

```

Route-local code (anything used by the home page only) lives under
`src/app/_modules/`. Cross-route primitives live under `src/components`,
`src/hooks`, and `src/lib`.

## License

Released under the [MIT License](LICENSE).
