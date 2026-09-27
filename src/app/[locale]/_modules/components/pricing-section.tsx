"use client"

import { Check, Minus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslations } from "@/lib/i18n/use-translations"
import { cn } from "@/lib/utils"

import {
  getWhatsAppUrl,
  PRICING,
  type PricingCategory,
  type PricingPackage,
} from "../constants/landing.constants"
import { CtaLink } from "./cta-link"
import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

function FeatureValue({ value }: { value: boolean | string }) {
  const t = useTranslations("pricing")
  const tCommon = useTranslations("common")

  if (value === true) {
    return (
      <span className="inline-flex items-center gap-2 font-semibold">
        <Check
          aria-hidden="true"
          className="size-4 text-primary"
          strokeWidth={3}
        />
        <span className="sr-only">{tCommon("included")}</span>
      </span>
    )
  }

  if (value === false) {
    return (
      <span className="inline-flex items-center text-muted-foreground">
        <Minus aria-hidden="true" className="size-4" strokeWidth={2} />
        <span className="sr-only">{tCommon("notIncluded")}</span>
      </span>
    )
  }

  return <span className="text-right font-semibold">{t(`values.${value}`)}</span>
}

function PricingCard({
  category,
  pricingPackage,
}: {
  category: PricingCategory
  pricingPackage: PricingPackage
}) {
  const t = useTranslations("pricing")
  const tWhatsApp = useTranslations("whatsapp")

  const categoryLabelKey = PRICING[category].labelKey
  const categoryLabel = t(`categories.${categoryLabelKey}`)
  const packageName = t(`packages.${pricingPackage.key}`)
  const price = t(`prices.${pricingPackage.priceKey}`)

  const need =
    category === "landing-page"
      ? tWhatsApp("packageNeedLandingPage")
      : tWhatsApp("packageNeedCompanyProfile")

  const message = `${tWhatsApp("packageIntro", {
    category: categoryLabel,
    package: packageName,
    price,
  })}\n\n${need}`

  return (
    <article
      className={cn(
        "relative flex min-h-full flex-col border border-foreground/20 bg-card p-5 sm:p-7 lg:border-y-0 lg:border-l-0 lg:p-8 lg:last:border-r-0",
        pricingPackage.popular &&
          "border-t-4 border-t-primary bg-secondary/65 lg:border-t-4"
      )}
    >
      <div className="flex min-h-8 items-start justify-between gap-4">
        <h3 className="font-heading text-2xl font-bold tracking-[-0.04em]">
          {packageName}
        </h3>
        {pricingPackage.popular ? (
          <Badge className="rounded-sm border border-foreground bg-primary px-2.5 py-1 font-mono text-[0.68rem] uppercase shadow-none">
            {t("mostPopular")}
          </Badge>
        ) : null}
      </div>

      <p className="mt-6 font-heading text-5xl leading-none font-extrabold tracking-[-0.06em] sm:text-6xl">
        {price}
      </p>

      <dl className="mt-9 flex flex-col gap-4">
        {pricingPackage.features.map((feature) => (
          <div
            key={feature.labelKey}
            className="grid grid-cols-[1fr_auto] items-start gap-4 text-sm"
          >
            <dt className="leading-5 text-muted-foreground">
              {t(`features.${feature.labelKey}`)}
            </dt>
            <dd className="flex justify-end">
              <FeatureValue value={feature.value} />
            </dd>
          </div>
        ))}
      </dl>

      <CtaLink
        href={getWhatsAppUrl(message)}
        external
        className="mt-7 w-full"
        variant={pricingPackage.popular ? "primary" : "secondary"}
      >
        {t("selectPackage", { name: packageName })}
      </CtaLink>
    </article>
  )
}

export function PricingSection() {
  const t = useTranslations("pricing")

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-24 border-y border-foreground/20 bg-background px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            id="pricing-heading"
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <Tabs defaultValue="landing-page" className="mt-12 gap-12">
          <TabsList
            aria-label={t("tabsAriaLabel")}
            className="sticky top-22 z-20 flex h-auto w-full max-w-xl items-center gap-3 bg-background/95 px-1 py-1 backdrop-blur-xl sm:static sm:bg-transparent sm:p-0 sm:backdrop-blur-none"
          >
            {(
              Object.entries(PRICING) as [
                PricingCategory,
                (typeof PRICING)[PricingCategory],
              ][]
            ).map(([key, group]) => (
              <TabsTrigger
                key={key}
                value={key}
                className={cn(
                  // Base chip — neo-brutalism recipe (matches .yt-tactile +
                  // the primary CTA buttons used across the project).
                  "yt-tactile inline-flex min-h-12 flex-1 items-center justify-center rounded-md border-2 px-4 py-3 font-bold whitespace-normal",
                  // Inactive — outline only, sits flat on the page.
                  "border-foreground/30 bg-background text-foreground",
                  "hover:border-foreground",
                  // Active — primary fill with the hard 3px foreground shadow
                  // that defines the project's tactile language.
                  "data-[state=active]:border-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[3px_3px_0_var(--foreground)]",
                  "data-[state=active]:hover:bg-primary",
                  // Keyboard focus ring — same offset as the rest of the site.
                  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                )}
              >
                {t(`categories.${group.labelKey}`)}
              </TabsTrigger>
            ))}
          </TabsList>

          {(
            Object.entries(PRICING) as [
              PricingCategory,
              (typeof PRICING)[PricingCategory],
            ][]
          ).map(([key, group]) => (
            <TabsContent key={key} value={key}>
              <div className="grid gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-0 lg:border-y lg:border-foreground/20">
                {group.packages.map((pricingPackage) => (
                  <PricingCard
                    key={pricingPackage.key}
                    category={key}
                    pricingPackage={pricingPackage}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
