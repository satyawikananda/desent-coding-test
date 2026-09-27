"use client"

import { MessageCircle } from "lucide-react"
import { FaFigma, FaGithub, FaNodeJs, FaReact } from "react-icons/fa"
import {
  SiNextdotjs,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiSanity,
} from "react-icons/si"

import { useTranslations } from "@/lib/i18n/use-translations"
import { cn } from "@/lib/utils"

import { CtaLink } from "./cta-link"
import AppImageFallback from "@/components/base/app-image-fallback"
import { yottabyteLogo } from "@/shared/assets"

/**
 * Stack showcase section. Adapted from a 21st.dev-style "orbit" component to
 * fit Yottabyte's neo-brutalist design language:
 *  - The section is a full-width primary color block instead of a card.
 *  - Orbit rings + center disc use semantic tokens that remain legible on the
 *    primary background.
 *  - Spin animation is CSS-only and the global reduced-motion rule disables it
 *    for users who opt out of motion.
 *  - All copy lives in the i18n dictionaries under the `stack` namespace; the
 *    tech icons themselves stay fixed (they are the actual brand marks).
 */
type IconKey =
  | "react"
  | "nextjs"
  | "typescript"
  | "tailwind"
  | "vercel"
  | "node"
  | "github"
  | "figma"
  | "stripe"
  | "sanity"

type IconConfig = {
  key: IconKey
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}

const ICONS: readonly IconConfig[] = [
  { key: "react", Icon: FaReact, color: "#61DAFB" },
  { key: "nextjs", Icon: SiNextdotjs, color: "#000000" },
  { key: "typescript", Icon: SiTypescript, color: "#3178C6" },
  { key: "tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { key: "vercel", Icon: SiVercel, color: "#000000" },
  { key: "node", Icon: FaNodeJs, color: "#339933" },
  { key: "github", Icon: FaGithub, color: "#181717" },
  { key: "figma", Icon: FaFigma, color: "#F24E1E" },
  // { key: "stripe", Icon: SiStripe, color: "#635BFF" },
  { key: "sanity", Icon: SiSanity, color: "#3184F0" },
] as const

type IconLabels = Record<IconKey, string>

const ORBIT_COUNT = 3
const ORBIT_GAP_REM = 7
const ORBIT_DURATION_BASE_S = 14

function OrbitIcon({
  cfg,
  angle,
  label,
}: {
  cfg: IconConfig
  angle: number
  label: string
}) {
  // Polar -> cartesian on a unit circle, scaled to %.
  // Round to 2 decimals so SSR (Node.js) and client (browser) cannot
  // diverge on `Math.cos`/`Math.sin` floating-point precision.
  const x = Math.round((50 + 50 * Math.cos(angle)) * 100) / 100
  const y = Math.round((50 + 50 * Math.sin(angle)) * 100) / 100

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-foreground bg-card p-2 shadow-[3px_3px_0_var(--primary-foreground)]"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <cfg.Icon
        className="size-7 dark:brightness-0 dark:invert"
        style={{ color: cfg.color }}
        aria-label={label}
      />
    </div>
  )
}

function Orbit({
  size,
  icons,
  index,
  durationSeconds,
  labels,
}: {
  size: string
  icons: readonly IconConfig[]
  index: number
  durationSeconds: number
  labels: IconLabels
}) {
  const angleStep = (2 * Math.PI) / icons.length

  /*
    CSS animation over Motion's `animate` prop because:
      1. Continuous `rotate` with `repeat: Infinity` is exactly what `@keyframes`
         is best at — no JS scheduling, no hydration lifecycle dependency.
      2. SSR and client emit identical markup (a plain `<div>`), so the
         hydration mismatch we used to fight with `initial={false}` is gone.
      3. The project `globals.css` already neutralizes this animation for
         prefers-reduced-motion users, so we don't need Motion's hook either.
  */
  return (
    <div
      className="absolute rounded-full border-2 border-dashed border-primary-foreground/40"
      style={{
        width: size,
        height: size,
        animation: `spin ${durationSeconds}s linear infinite`,
      }}
      aria-hidden={index === 0 ? undefined : true}
    >
      {icons.map((cfg, iconIdx) => (
        <OrbitIcon
          key={cfg.key}
          cfg={cfg}
          angle={iconIdx * angleStep}
          label={labels[cfg.key]}
        />
      ))}
    </div>
  )
}

interface StackFeatureSectionProps {
  className?: string
  /**
   * Primary CTA destination. Pass an external URL (e.g. the WhatsApp
   * consultation deeplink) when the section sits above the footer and is the
   * page's last conversion hook. Defaults to `#pricing`.
   */
  primaryCtaHref?: string
  /** Secondary CTA destination. Defaults to `#pricing`. */
  secondaryCtaHref?: string
}

export function StackFeatureSection({
  className,
  primaryCtaHref = "#pricing",
  secondaryCtaHref = "#pricing",
}: StackFeatureSectionProps) {
  const t = useTranslations("stack")

  const iconsPerOrbit = Math.ceil(ICONS.length / ORBIT_COUNT)
  const labels = {
    react: t("iconAriaLabels.react"),
    nextjs: t("iconAriaLabels.nextjs"),
    typescript: t("iconAriaLabels.typescript"),
    tailwind: t("iconAriaLabels.tailwind"),
    vercel: t("iconAriaLabels.vercel"),
    node: t("iconAriaLabels.node"),
    github: t("iconAriaLabels.github"),
    figma: t("iconAriaLabels.figma"),
    stripe: t("iconAriaLabels.stripe"),
    sanity: t("iconAriaLabels.sanity"),
  }

  return (
    <section
      aria-labelledby="stack-heading"
      className={cn(
        "relative overflow-hidden bg-primary px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="relative z-10 mx-auto flex min-h-112 max-w-7xl items-center py-20 lg:py-4">
        <div className="w-full lg:w-1/2">
          <h2
            id="stack-heading"
            className="font-heading text-4xl font-bold tracking-tight text-balance text-primary-foreground sm:text-5xl"
          >
            {t("heading")}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-pretty text-primary-foreground sm:text-lg">
            {t("description")}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/*
              The primary button swaps to the background surface so it remains
              distinct on a primary-colored section. The secondary action stays
              transparent until hover to preserve a clear visual hierarchy.
            */}
            <CtaLink
              href={primaryCtaHref}
              external
              icon={
                <MessageCircle
                  aria-hidden="true"
                  className="size-5 transition-transform duration-200 group-hover/cta:scale-110"
                  strokeWidth={2.5}
                />
              }
              className="min-h-14 border-primary-foreground bg-background px-6 py-4 text-base font-bold text-foreground shadow-[3px_3px_0_var(--primary-foreground)] hover:bg-secondary"
            >
              {t("primaryCta")}
            </CtaLink>
            <CtaLink
              href={secondaryCtaHref}
              variant="secondary"
              className="min-h-14 border-primary-foreground bg-transparent px-6 py-4 text-base font-bold text-primary-foreground hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              {t("secondaryCta")}
            </CtaLink>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute top-1/2 right-0 hidden size-160 translate-x-[42%] -translate-y-1/2 items-center justify-center lg:flex">
        {/* Center disc — deliberately a fixed square so it doesn't rotate with the rings. */}
        <div
          aria-hidden="true"
          className="z-10 flex size-24 items-center justify-center rounded-full border-2 border-primary-foreground bg-background shadow-[4px_4px_0_var(--primary-foreground)]"
        >
          {/* <FaReact className="size-12" style={{ color: "#61DAFB" }} /> */}
          <span className="block size-12 shrink-0" aria-hidden="true">
            <AppImageFallback
              src={yottabyteLogo.src}
              placeholderSrc="/images/yottabyte-logo.webp"
              alt="yottabyte-logo"
              width={yottabyteLogo.width}
              height={yottabyteLogo.height}
              className="h-full w-full object-contain"
              preload
            />
          </span>
        </div>

        {[...Array(ORBIT_COUNT)].map((_, orbitIdx) => {
          const size = `${12 + ORBIT_GAP_REM * (orbitIdx + 1)}rem`
          const orbitIcons = ICONS.slice(
            orbitIdx * iconsPerOrbit,
            orbitIdx * iconsPerOrbit + iconsPerOrbit
          )
          return (
            <Orbit
              key={orbitIdx}
              size={size}
              icons={orbitIcons}
              index={orbitIdx}
              durationSeconds={ORBIT_DURATION_BASE_S + orbitIdx * 6}
              labels={labels}
            />
          )
        })}
      </div>
    </section>
  )
}

export default StackFeatureSection
