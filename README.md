# Fio Next.js Starter Template

Fio is an opinionated Next.js 16 starter with a landing page, component
playground, client and server data-fetching examples, theming, feedback UI,
error handling, and SEO defaults already wired together.

## Highlights

- Next.js App Router with React Server Components and strict TypeScript
- Tailwind CSS v4 and shadcn/ui with reusable project-level primitives
- Light, dark, and system themes through `next-themes`
- TanStack Query for client-side server state and `ofetch` API helpers
- Zustand persistence for the live primary-colour customizer
- Sonner toasts, app modals, tooltips, and a route progress indicator
- Dynamic Open Graph images rendered by Takumi
- Metadata, canonical URLs, `robots.txt`, and `sitemap.xml` defaults
- Route and global error boundaries with reusable fallback UI
- Route-local `_modules` architecture to keep feature code co-located

## Quick start

The project uses [Bun](https://bun.sh/) and tracks `bun.lockb` as its lockfile.

```bash
bun install
cp .env.example .env.local
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable   | Development default     | Purpose                                                                                            |
| ---------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| `SITE_URL` | `http://localhost:3000` | Absolute site origin used for canonical metadata, Open Graph URLs, `robots.txt`, and `sitemap.xml` |

Set `SITE_URL` to the real public origin in production, including the protocol:

```env
SITE_URL=https://example.com
```

## Available scripts

| Command                    | Description                                   |
| -------------------------- | --------------------------------------------- |
| `bun run dev`              | Start the development server with webpack     |
| `bun run build`            | Create an optimized production build          |
| `bun run build:cloudflare` | Create the Cloudflare Worker build            |
| `bun run start`            | Serve the production build                    |
| `bun run preview`          | Build and preview in the Workers runtime      |
| `bun run deploy`           | Build and deploy to Cloudflare Workers        |
| `bun run upload`           | Build and upload a new Worker version         |
| `bun run cf-typegen`       | Generate TypeScript types for Worker bindings |
| `bun run lint`             | Run ESLint across the project                 |
| `bun run typecheck`        | Run TypeScript without emitting files         |
| `bun run format`           | Format TypeScript and TSX files with Prettier |

## Routes

| Route               | Description                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------- |
| `/`                 | Starter landing page and links to the included demos                                                     |
| `/components`       | Fio and shadcn/ui component playground, live colour picker, modals, toasts, typography, and image states |
| `/demo/react-query` | Client-side news request with `ofetch` and TanStack Query                                                |
| `/demo/server-side` | Server-rendered Pokemon data with one-week revalidation                                                  |
| `/og`               | Dynamic `1200 × 630` Open Graph image rendered by Takumi                                                 |
| `/robots.txt`       | Generated crawler rules                                                                                  |
| `/sitemap.xml`      | Generated sitemap for the public demo routes                                                             |

The two data demos call public third-party APIs, so they require network access
and should be replaced or removed when adapting the starter to a real product.

## What's included

| Area                | Implementation                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------------------------- |
| App shell           | Theme, progress, tooltip, toast, and modal providers in the root layout                                    |
| Component system    | shadcn/ui primitives plus Fio typography, theme controls, image fallback, error, and layout components     |
| Feedback UI         | Typed confirm/warning modals, Sonner toast variants, skeletons, and loading states                         |
| Theme customization | Runtime primary-colour updates persisted with Zustand                                                      |
| Client data         | Reusable `BaseApi` wrapper and a route-scoped TanStack Query provider                                      |
| Server data         | RSC fetch example with cache revalidation and partial failure handling                                     |
| SEO                 | Typed metadata builder, canonical URLs, Open Graph/Twitter metadata, dynamic OG image, robots, and sitemap |
| Resilience          | Custom not-found, route error, and global error experiences                                                |

## Project structure

```text
src/
├── app/                          # App Router pages and metadata routes
│   ├── _modules/                 # home-only code
│   ├── components/_modules/      # component playground code
│   ├── demo/*/_modules/          # route-specific demo code
│   └── og/                       # Takumi Open Graph image endpoint
├── components/
│   ├── background/               # animated background effects
│   ├── base/                     # reusable app-level components
│   ├── provider/                 # scoped data and navigation providers
│   └── ui/                       # shadcn/ui primitives
├── hooks/                        # shared React hooks
├── lib/
│   ├── api/                      # API client and domain integrations
│   ├── seo/                      # metadata builder and site URL
│   └── utils.ts                  # class-name helper
├── shared/{assets,constant}/     # shared assets and constants
├── stores/                       # Zustand stores
├── styles/                       # Tailwind entry and design tokens
└── @types/                       # global TypeScript declarations
```

Code used by only one route belongs under that route's `_modules` directory.
Promote it to `src/components`, `src/hooks`, or `src/lib` only when it is shared.

## Tech stack

| Category       | Tools                                                |
| -------------- | ---------------------------------------------------- |
| Framework      | Next.js 16.2, React 19.2, TypeScript 5.9             |
| Styling        | Tailwind CSS 4, CSS variables, `tw-animate-css`      |
| Components     | shadcn/ui (`radix-luma`), Radix UI, Lucide icons     |
| State and data | TanStack Query 5, Zustand 5, `ofetch`                |
| UI behavior    | Motion 12, `next-themes`, Sonner, `@bprogress/next`  |
| Social images  | Takumi 2                                             |
| Fonts          | DM Sans, Figtree, and Geist Mono through `next/font` |

Path aliases are configured as `@/*` for `src/*` and `~/*` for `public/*`.

## Production

Run the same checks used before deployment:

```bash
bun run lint
bun run typecheck
SITE_URL=https://example.com bun run build
```

The generated app can be served with `bun run start`. Deployment-provider
configuration for Cloudflare Workers is included through OpenNext.

### Cloudflare Workers

Authenticate Wrangler once, then preview the application in the same `workerd`
runtime used by Cloudflare:

```bash
bunx wrangler login
cp .dev.vars.example .dev.vars
SITE_URL=http://localhost:8787 bun run preview
```

Set `SITE_URL` to the final `workers.dev` or custom-domain origin when deploying:

```bash
SITE_URL=https://example.com bun run deploy
```

Do not run `bunx wrangler deploy` directly from a clean checkout. Wrangler
delegates OpenNext projects to `opennextjs-cloudflare deploy`, which expects the
generated `.open-next/worker.js`, `.open-next/assets`, and `.open-next/cache`
artifacts to already exist. The `bun run deploy` script builds those artifacts
before deploying. If build and deploy are separate CI steps, run
`bun run build:cloudflare` first and only run the deploy step after it succeeds.

For Cloudflare Workers Builds, use `bun run build:cloudflare` as the build
command and `bunx opennextjs-cloudflare deploy` as the deploy command. Add
`SITE_URL` to both **Build variables and secrets** and the Worker's runtime
environment variables. The build output under `.open-next/` is generated and
intentionally ignored by Git.

#### Automatic deployments with Workers Builds

Connect the GitHub repository to the existing `yottabyte-lp` Worker in
**Workers & Pages > yottabyte-lp > Settings > Build**, then use these settings:

| Setting                       | Value                               |
| ----------------------------- | ----------------------------------- |
| Production branch             | `main`                              |
| Root directory                | `/`                                 |
| Build command                 | `bun run ci:cloudflare`             |
| Deploy command                | `bunx opennextjs-cloudflare deploy` |
| Non-production deploy command | `bunx opennextjs-cloudflare upload` |

Add `BUN_VERSION=1.4.1` under **Build variables and secrets** so Workers Builds
uses the same Bun version as this repository. Enable builds for non-production
branches if pull requests should receive Cloudflare preview versions. Production
deployments will then run automatically for every push to `main`; failed lint,
typecheck, or OpenNext builds stop the deployment.

The starter uses OpenNext's read-only static-assets cache for prerendered pages,
so it does not require R2, D1, or Durable Objects for the included demos. A new
deployment refreshes the cached output. Add OpenNext's R2 incremental cache and
Durable Object queue before depending on runtime revalidation in a production
product.

## Current scope

This repository is a starter and demo surface. It does not include a real
backend, authentication, database, form stack, analytics, or provider-specific
application infrastructure. The public API integrations and sample content are
examples, not product dependencies.

The repository intentionally includes both `.agents/` and `.claude/` tooling so
the same project conventions are available to different coding agents. Start
with [AGENTS.md](AGENTS.md), [CLAUDE.md](CLAUDE.md), and
[.claude/AGENTS.md](.claude/AGENTS.md) before making structural changes.

## License

Released under the [MIT License](LICENSE).
