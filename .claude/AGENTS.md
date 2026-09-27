# Agent Rules for fio-basic-boilerplate

## 1. Follow Installed Skills

This project has the following skills installed. Adhere to their guidelines when working on relevant tasks:

| Skill | When to Use |
|-------|-------------|
| `ui-ux-pro-max` | UI/UX design decisions, styling, component architecture |
| `next-best-practices` | Next.js patterns, RSC boundaries, data fetching, metadata |
| `shadcn` | Working with shadcn/ui components, adding new components |
| `framer-motion-animator` | Animations, page transitions, micro-interactions |
| `accessibility` | WCAG compliance, keyboard nav, screen reader support |
| `tanstack-query` | Server state management, data fetching |
| `emil-design-eng` | UI polish, component design, invisible details |
| `simplify` | Code review, quality improvement, efficiency |

**Invoke relevant skills proactively** when working on tasks that match their scope.

---

## 2. Use Standardized Code

Before writing code, **screen the existing codebase** for context:

### Code Patterns to Follow

**Utilities:**
- Use `cn()` from `@/lib/utils` for className merging (clsx + tailwind-merge)
- Follow the `ClassValue` type convention

**Components:**
- Use shadcn/ui components from `@/components/ui/*`
- Follow the `cva` (class-variance-authority) pattern for variant props
- Components use `React.forwardRef` pattern
- Display names follow: `ComponentName.displayName = "ComponentName"`

**File Structure:**
- Components: `@/components/ui/`, `@/components/base/`, `@/components/background/`
- Lib/API: `@/lib/api/` with typed APIs
- Providers: `@/components/provider/`
- Types: Co-located with features or in `@/src/@types/`

**Imports:**
- Use `@/*` path aliases (components, lib, hooks, styles)
- Relative imports for co-located types

**Styling:**
- Tailwind CSS with CSS variables from `src/styles/globals.css`
- Use `dark:` prefix for dark mode variants
- Follow `rounded-4xl` border-radius convention

**Providers:**
- React Query via `ReactQueryProvider` from `@/components/provider/react-query-provider`
- Theme via `ThemeProvider` from `@/components/theme-provider`
- Tooltip via `TooltipProvider` from `@/components/ui/tooltip`
- BProgress via `BprogressProvider` from `@/components/provider/bprogress-provider`

**Fonts:**
- Variable fonts: `font-sans` (DM Sans), `font-heading` (Figtree), `font-mono` (Geist Mono)

---

## 3. Project Context

- **Framework:** Next.js 14+ with App Router, TypeScript
- **Styling:** Tailwind CSS with CSS variables, dark mode support
- **Components:** shadcn/ui (radix-luma style)
- **Icons:** Lucide React
- **State:** TanStack Query for server state
- **Animation:** Framer Motion ready

---

## 4. _modules Pattern (Local-First Architecture)

When creating **component, utils, constants, hook, or type** that is only used in a **specific page** (not globally), follow this pattern:

```
page-directory/
└── _modules/
    └── {type}/
        └── file.ts(x)
```

**Type folders:**
- `components/` - UI components
- `utils/` - Utility functions
- `constants/` - Constants
- `hooks/` - Custom hooks
- `types/` - TypeScript types

**Examples:**
- `src/app/demo/react-query/_modules/components/news-card.tsx`
- `src/app/demo/server-side/_modules/utils/pokemon.utils.ts`
- `src/app/demo/server-side/_modules/types/pokemon.type.ts`
- `src/app/demo/server-side/_modules/constants/pokemon.constants.ts`

**Rule:** If code is only used within one page/directory, keep it co-located in `_modules`. Only extract to global (`@/components/ui/`, `@/lib/`, etc.) when reuse across multiple pages is needed.

---

## 5. Workflow

1. **Analyze task** → identify which skills apply
2. **Screen codebase** → look for existing patterns, conventions, similar components
3. **Apply relevant skill guidelines** → follow best practices from installed skills
4. **Write code consistent with project standards** → use established patterns
5. **Verify** → ensure code matches project conventions