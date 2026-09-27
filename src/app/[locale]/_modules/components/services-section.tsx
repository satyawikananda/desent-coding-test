"use client"

import { motion, useReducedMotion } from "motion/react"

import AppImageFallback from "@/components/base/app-image-fallback"
import { useTranslations } from "@/lib/i18n/use-translations"
import { cn } from "@/lib/utils"

import {
  getWhatsAppUrl,
  SERVICES,
  type ServiceItem,
} from "../constants/landing.constants"
import { CtaLink } from "./cta-link"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

type Service = ServiceItem

const ARTWORK_SEEDS = [
  "yottabyte-landing-page",
  "yottabyte-company-site",
  "yottabyte-custom-app",
] as const

// Scroll cue preserved from the previous iteration — kept tight under the
// heading so the bento grid (shorter than the old sticky-stack) doesn't leave
// a dead band of whitespace at the top of the section.
function ScrollHint() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="mt-6 flex items-center justify-start sm:mt-8"
    >
      <motion.div
        className="flex items-center gap-4 text-primary sm:gap-5"
        animate={shouldReduceMotion ? undefined : { y: [0, 4, 0] }}
        transition={{
          duration: 1.8,
          ease: [0.45, 0, 0.55, 1],
          repeat: Infinity,
        }}
      >
        <span className="select-none font-heading text-lg font-bold uppercase tracking-[0.15em] sm:text-xl">
          Jelajahi
        </span>
        <svg
          width="68"
          height="52"
          viewBox="0 0 68 52"
          fill="none"
          aria-hidden="true"
          className="overflow-visible"
        >
          <motion.path
            d="M 2 12 H 24 Q 36 12 36 24 V 38"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 5"
            strokeLinecap="round"
            fill="none"
            animate={
              shouldReduceMotion ? undefined : { strokeDashoffset: [0, -16] }
            }
            transition={{
              duration: 1.4,
              ease: "linear",
              repeat: Infinity,
            }}
          />
          <path
            d="M 30 32 L 36 38 L 42 32"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  )
}

function BentoCard({
  service,
  index,
  className,
}: {
  service: Service
  index: number
  className?: string
}) {
  const t = useTranslations("services")
  const tWhatsApp = useTranslations("whatsapp")
  const shouldReduceMotion = useReducedMotion()
  const seed = ARTWORK_SEEDS[index] ?? ARTWORK_SEEDS[0]
  const isCustom = service.custom === true
  const href = isCustom
    ? getWhatsAppUrl(tWhatsApp("customProject"))
    : (service.href ?? "#")

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-md",
        "border-2 border-foreground bg-card",
        "shadow-[4px_4px_0_var(--foreground)] transition-shadow duration-200",
        "hover:shadow-[6px_6px_0_var(--foreground)]",
        // Custom Website uses a horizontal layout (image left, text right)
        // so its card height is driven by content width rather than by
        // image-on-top stacking — this is what cuts the scroll. The other
        // two services stay as upright tiles.
        isCustom
          ? "flex flex-col lg:flex-row"
          : "flex flex-col",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-secondary",
          // For Custom Website: image is left ~40% on desktop, with a
          // vertical border (border-r) instead of bottom border. On mobile
          // it still stacks on top so the card reads correctly at narrow
          // widths.
          isCustom
            ? "aspect-16/10 w-full shrink-0 border-b-2 border-foreground lg:aspect-auto lg:w-2/5 lg:border-b-0 lg:border-r-2"
            : "aspect-16/10 w-full border-b-2 border-foreground"
        )}
      >
        <AppImageFallback
          src={`https://picsum.photos/seed/${seed}/1600/1200`}
          placeholderSrc={`https://picsum.photos/seed/${seed}/40/30`}
          alt=""
          width={1600}
          height={1200}
          sizes={
            isCustom
              ? "(min-width: 1024px) 40vw, 100vw"
              : "(min-width: 1024px) 50vw, 100vw"
          }
          loading={index === 0 ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
        />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col gap-4 p-6 sm:p-8",
          // Vertically center text in the shorter Custom Website card so it
          // doesn't hug the top.
          isCustom && "lg:justify-center lg:gap-3 lg:p-7 lg:pr-8"
        )}
      >
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
          {t(`items.${service.key}.suitableFor`)}
        </p>
        <h3 className="font-heading text-2xl font-bold tracking-[-0.04em] text-balance sm:text-3xl">
          {t(`items.${service.key}.title`)}
        </h3>
        <p className="flex-1 text-sm leading-6 text-muted-foreground sm:text-base">
          {t(`items.${service.key}.description`)}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
          {isCustom ? (
            <p className="font-heading text-xl font-bold tracking-tight sm:text-2xl">
              {t(`items.${service.key}.pricing`)}
            </p>
          ) : null}
          <CtaLink href={href} external={isCustom} variant="text">
            {t(`items.${service.key}.ctaLabel`)}
          </CtaLink>
        </div>
      </div>
    </motion.article>
  )
}

export function ServicesSection() {
  const t = useTranslations("services")

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-24 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10 lg:px-8 lg:pt-20 lg:pb-12">
        <Reveal>
          <SectionHeading
            id="services-heading"
            title={t("title")}
            description={t("description")}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <ScrollHint />
        </Reveal>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
        <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-6 lg:gap-6">
          {SERVICES.map((service, index) => {
            /*
              Bento layout: LP + CP share row 1 (col-span-3 each = 50%), CW
              takes the full row 2 (col-span-6). Each BentoCard is its own
              card (rounded-md), so we let the gap separate them rather than
              trying to flush corners.
            */
            const layoutClasses =
              index === 0
                ? "lg:col-span-3"
                : index === 1
                  ? "lg:col-span-3"
                  : "lg:col-span-6"
            return (
              <Reveal
                key={service.key}
                delay={0.2 + index * 0.12}
                className={layoutClasses}
              >
                <BentoCard service={service} index={index} />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
