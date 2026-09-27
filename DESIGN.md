---
name: Fio
description: A Next.js starter with opinionated defaults.
colors:
  primary: "oklch(0.65 0.15 145)"
  primary-foreground: "oklch(0.98 0.01 145)"
  ring: "oklch(0.65 0.15 145)"
  destructive: "oklch(0.577 0.245 27.325)"
  neutral-bg: "oklch(1 0 0)"
  neutral-fg: "oklch(0.141 0.005 285.823)"
  neutral-muted: "oklch(0.967 0.001 286.375)"
  neutral-muted-fg: "oklch(0.552 0.016 285.938)"
  neutral-border: "oklch(0.92 0.004 286.32)"
  sidebar: "oklch(0.985 0 0)"
  sidebar-fg: "oklch(0.141 0.005 285.823)"
typography:
  display:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.625rem"
  xl: "0.875rem"
  2xl: "1.125rem"
  3xl: "1.375rem"
  4xl: "1.625rem"
spacing:
  0: "0"
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  6: "1.5rem"
  8: "2rem"
  12: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.4xl}"
    padding: "0.625rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
  card-default:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-fg}"
    rounded: "{rounded.4xl}"
    padding: "1.5rem"
  tabs-list:
    backgroundColor: "{colors.neutral-muted}"
    rounded: "{rounded.4xl}"
    padding: "0.25rem"
  tooltip-content:
    backgroundColor: "{colors.neutral-fg}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.xl}"
    padding: "0.375rem 0.75rem"
  select-trigger:
    backgroundColor: "{colors.neutral-muted}"
    textColor: "{colors.neutral-fg}"
    rounded: "{rounded.3xl}"
    padding: "0.5rem 0.75rem"
---

# Design System: Fio

## 1. Overview

**Creative North Star: "The Workbench."**

The system reads as a pre-drilled maker's surface: the tools are already where you'd reach for them. The grid is sharp and the layout is mechanically predictable, but the defaults are warm enough that you actually want to use it — the typography has a real headline voice, the surfaces commit to a single accent instead of hedging with grays, and the friendly mascot (`fiony.avif`) keeps the surface from sliding into the SaaS-cream orthodoxy.

The workbench is opinionated but not hostile. It commits to a primary palette and a type stack, but neither locks the user in: the color picker rewrites `--primary` live so any dev can swap palettes in seconds, and the typography tokens are CSS variables that drop cleanly into Tailwind. The mechanics of the system are exposed, not hidden — that's the "ready-to-fork" claim PRODUCT.md is built on.

The system explicitly rejects four adjacent families so the lane stays clear: the **SaaS-cream / SaaS-blue gradient trap** (no warm-neutral body backgrounds, no "ABOUT / PROCESS / PRICING" eyebrows, no identical icon + heading + text feature grids), the **editorial-magazine reflex** (no display-serif + ruled-columns Klim pastiche), the **SaaS template-grid reflex** (no infinite identical cards, no nested cards, no glassmorphism-as-default, no gradient text), and the **terminal/developer-tool reflex** (no monospace-as-costume, no pure-black-and-terminal-green).

**Key Characteristics:**
- **Sharp grid, warm defaults.** Predictable 8px spacing and consistent corner radii, paired with a committed accent and a friendly mascot.
- **Live and swappable.** The color system rewrites `--primary` on every palette change; the typography tokens live in CSS variables; nothing is hardcoded into a component.
- **Inventoried, not curated.** The `/components` route demos real prop combinations and prop edge cases, not curated hero shots.
- **Tactile primitives.** Buttons and cards have a tap-able weight (medium-large radius, generous padding, committed color). Nothing reads as a placeholder.
- **Three fonts, three jobs.** Figtree carries display and headings (the opinion). DM Sans carries body (the readability). Geist Mono carries labels and code (the technical).

## 2. Colors

The palette commits to one accent (Clover Green by default — committed, not hedged), then grounds everything on a true-white / cool-zinc neutral stack. The accent is dynamic: the color picker writes `--primary` (and `--ring`, `--chart-*`, `--sidebar-primary`) from any of 19 OKLCH palettes, so the entire surface re-tints live without rebuilding.

### Primary
- **Clover Green** (`oklch(0.65 0.15 145)`): the default primary. Used for primary buttons, the page icon mask, the favicon, and the bprogress bar — i.e. the four surfaces the color picker most visibly drives. Also writes `--ring` so focus rings track the palette.
- **Primary Foreground** (`oklch(0.98 0.01 145)`): the foreground for primary backgrounds. Always near-white, always tinted toward the primary hue so it stays in the same family at every palette swap.

### Neutral
- **Paper White** (`oklch(1 0 0)`): the body background. True white, no warm tint — explicitly not the SaaS-cream default.
- **Carbon Ink** (`oklch(0.141 0.005 285.823)`): the default foreground. Near-black with a hint of cool, so it reads as zinc not as a flat #000.
- **Cool Mist** (`oklch(0.967 0.001 286.375)`): the muted / secondary / accent surface — sidebar, code chips, the tabs pill background. Reads as soft cool gray.
- **Slate Veil** (`oklch(0.552 0.016 285.938)`): the muted-foreground. Helper text, captions, card descriptions.
- **Hairline** (`oklch(0.92 0.004 286.32)`): the border and input border. Lower-contrast than the foreground so it sits behind content.
- **Card White** (`oklch(1 0 0)`): the card surface, identical to the body. Cards carry separation via shadow, not via a tinted background.

### Sidebar
- **Sidebar Paper** (`oklch(0.985 0 0)`): the sidebar surface, one half-step off pure white so it reads as a panel rather than the page.

### Status
- **Alert Red** (`oklch(0.577 0.245 27.325)`): destructive actions and error states only. Never used as decoration.

### Named Rules
**The One Accent Rule.** The primary accent carries primary actions, current selection, and the four live surfaces (icon, favicon, bprogress, focus ring). It is never decoration. Its rarity on any given screen is the point.

**The No-Cream-Body Rule.** The body background is true white at L 1.0. No warm tints, no beige, no sand. "Warmth" is carried by accent + typography + imagery — not by the body.

**The Dynamic-Accent Rule.** The primary is an OKLCH triple written to a CSS variable, not a hex value hardcoded into a component. Every accent surface reads `var(--primary)`; the color picker can swap it without a rebuild.

## 3. Typography

**Display Font:** Figtree (`--font-heading`, Figtree, ui-sans-serif, system-ui, sans-serif)
**Body Font:** DM Sans (`--font-sans`, DM Sans, ui-sans-serif, system-ui, sans-serif)
**Label/Mono Font:** Geist Mono (`--font-mono`, Geist Mono, ui-monospace, monospace)

**Character:** A three-family system where Figtree carries opinion (display + headings), DM Sans carries readability (body), and Geist Mono carries technical metadata (chips, code, prop names). No two families are close enough to read as the same voice; the contrast axis is humanist sans (DM Sans) vs. geometric sans (Figtree) vs. technical mono (Geist Mono).

### Hierarchy
- **Display** (Figtree, 600, `clamp(2.25rem, 5vw, 3rem)`, lh 1.2, tracking `-0.025em`): H1 hero only. The "Fio Next.js Starter Template" wordmark, used once.
- **Headline** (Figtree, 600, 1.875rem, lh 1.25, tracking `-0.02em`): section H2s across `/components` and the demos.
- **Title** (Figtree, 600, 1.5rem): card titles and modal headers. Same family as Headline at a step down.
- **Body** (DM Sans, 400, 1rem, lh 1.5): running prose. Capped at 65–75ch on landing sections. `lead` variant lifts to 1.25rem + muted foreground for stand-first paragraphs.
- **Label** (Geist Mono, 500, 0.75rem, lh 1): chips, code, prop names inside copy. Always mono, never sans — the technical voice stays distinct.

### Named Rules
**The Three-Family Rule.** Display and Body are different voices (Figtree vs. DM Sans). Mono is for technical content only — never used as body text or headings, and never used as a shortcut for "developer aesthetic."

**The Display-Ceiling Rule.** Display tops out at clamp max ~3rem (48px). The hero is large, not shouting; the page never exceeds the 6rem ceiling.

## 4. Elevation

**Flat by default.** Surfaces are flat at rest; separation comes from a single very-light shadow on cards and a hairline ring. Shadows appear as a response to state, not as a base style on every container.

Cards rest with `shadow-md` + `ring-1 ring-foreground/5` (light) and `ring-foreground/10` (dark). That's the entire resting vocabulary. The Tabs trigger switches to `bg-background` + a `shadow-sm` when selected — selection is a shadow, not a stripe or a fill change. For emphasised cards (a featured plan, an in-context callout), the ring color shifts toward `--primary` (`ring-primary/40`) while keeping the same single-pixel hairline — emphasis via color, not stripe.

**The Hairline-Ring Rule.** Default separation is a 1px ring at `ring-foreground/5` (light) or `ring-foreground/10` (dark). Shadows are reserved for elevation changes; rings are for surface borders.

**The No-Stripe Rule.** Borders are full, never side-stripe. No `border-left: 4px solid …` as a colored accent on cards, list items, callouts, or alerts.

## 5. Components

### Buttons

- **Shape:** rounded-4xl (`1.625rem`, the project's largest corner radius). Buttons read as pills, not rectangles.
- **Primary:** `bg-primary text-primary-foreground hover:bg-primary/80`. Padding `0.625rem 1rem` (default), `0.5rem 0.75rem` (sm), `0.75rem 1rem` (lg). Active state nudges down 1px on `not-aria-[haspopup]`.
- **Outline:** `border-border bg-background hover:bg-muted`. Same shape and sizing as primary.
- **Secondary:** `bg-secondary text-secondary-foreground hover:bg-secondary/80`. Subdued, for non-primary actions.
- **Ghost:** `hover:bg-muted`. Used for tertiary actions in dense UI; no border, no fill at rest.
- **Destructive:** `bg-destructive/10 text-destructive hover:bg-destructive/20`. Red on a 10% red surface, never solid red — destructive stays legible without being loud.
- **Link:** `text-primary underline-offset-4 hover:underline`. No background, no border.
- **Loading:** replaces the inline icon with a spinning `Loader2`; the label stays. `disabled` while loading.

### Cards / Containers

- **Corner Style:** rounded-4xl (`1.625rem`).
- **Background:** `bg-card`, identical to body. No tinted card surface; separation is shadow + ring.
- **Shadow Strategy:** `shadow-md` + `ring-1 ring-foreground/5` at rest; lifts on hover where appropriate.
- **Border:** `ring-1` (Tailwind ring, not border). Same visual, no layout shift.
- **Internal Padding:** `1.5rem` (default), `1rem` (sm size).
- **Slots:** Header (title + description + optional action), Content, Footer (gap 6, ring 1 if border-t used).

### Inputs / Fields

- **Style:** `bg-input/50 border border-transparent` (Select trigger). `rounded-3xl` on SelectTrigger, `rounded-2xl` on SelectItem. Padding `0.5rem 0.75rem`.
- **Focus:** `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30`. Ring tracks `--ring`, so focus state retints when the palette changes.
- **Invalid:** `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20`. Red ring, red border.
- **Disabled:** `disabled:opacity-50 disabled:cursor-not-allowed`.

### Tabs

- **List:** `bg-muted rounded-4xl p-1`. The pill that holds the triggers.
- **Trigger:** `rounded-3xl` (slightly tighter than the list). `data-[state=active]:bg-background data-[state=active]:shadow-sm` — selection is a background switch plus a small shadow, not a stripe.
- **Content:** `flex-1 outline-none`. No borders, no separator lines between tabs and content.

### Tooltip

- **Background:** `bg-foreground` (Carbon Ink). Inverse of the page.
- **Text:** `text-background` (Paper White).
- **Shape:** `rounded-xl`. Tighter than the card radius — toasts and overlays always use a smaller radius than the surrounding surface.
- **Motion:** `data-[state=delayed-open]:animate-in fade-in-0 zoom-in-95`. Sub-200ms; informational, not theatrical.

### Signature: AppImageFallback

- **Purpose:** A drop-in `next/image` replacement with guaranteed `placeholderSrc` fallback, blurred preview while loading, and optional IntersectionObserver gate.
- **Shape:** `rounded-xl` on the wrapper. `overflow-hidden` so the blurred placeholder doesn't bleed.
- **States:** loading (skeleton + blurred preview of `placeholderSrc`), loaded (opacity fades in over 500ms), error (falls back to `placeholderSrc`), IO-gated (`useIO` delays mount until viewport).

## 6. Do's and Don'ts

Concrete guardrails carried forward from PRODUCT.md's anti-references. Every "Don't" below repeats an anti-reference by name so the visual spec enforces the strategic line.

### Do:
- **Do** commit to one accent per palette and let the color picker swap it live. The whole system re-tints without a rebuild.
- **Do** carry separation with `shadow-md + ring-1`, not with tinted backgrounds or side-stripes.
- **Do** keep the body background at `oklch(1 0 0)` — true white, no warm tint.
- **Do** use Figtree for display/headings, DM Sans for body, Geist Mono for technical labels. Three families, three jobs.
- **Do** cap the hero at `clamp(2.25rem, 5vw, 3rem)`. The page announces, it doesn't shout.
- **Do** write accents as OKLCH triples through CSS variables, not as hex values hardcoded into a component.

### Don't:
- **Don't** use cream / sand / beige body backgrounds — true white at L 1.0 is the body. "Warmth" is the accent and the type, not the canvas. (Anti-reference: the SaaS-cream / SaaS-blue gradient trap.)
- **Don't** put a tiny uppercase tracked eyebrow above every section heading. One named kicker can be voice; one above every section is AI grammar.
- **Don't** ship identical icon + heading + text feature grids in a row. Vary the grid; break the rhythm. (Anti-reference: the SaaS template-grid reflex.)
- **Don't** use display-serif + ruled-columns + italic drop caps. Fio is a starter, not a magazine. (Anti-reference: the editorial-magazine reflex.)
- **Don't** use border-left greater than 1px as a colored accent on cards, list items, or alerts. Use a full border, a background tint, or nothing.
- **Don't** use `background-clip: text` + a gradient. Solid color emphasis, every time.
- **Don't** use monospace as a shortcut for "developer / technical." Geist Mono is for technical content only (chips, code, prop names); body and headings stay in Figtree / DM Sans. (Anti-reference: the terminal / developer-tool reflex.)
- **Don't** hardcode color hex values into components. Every accent reads `var(--primary)`; the picker is a feature, not a courtesy.
- **Don't** gate content visibility on a class-triggered transition. Reveals enhance an already-visible default; they never replace it.