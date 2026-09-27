import { useTranslations } from "@/lib/i18n/use-translations"

import { HeroSection as HeroSectionLayout } from "@/components/ui/hero-section-2"
import { yottabyteHero } from "@/shared/assets"

import { getWhatsAppUrl } from "../constants/landing.constants"

export function HeroSection() {
  const t = useTranslations("hero")
  const tWhatsApp = useTranslations("whatsapp")

  return (
    <HeroSectionLayout
      id="top"
      headingId="hero-heading"
      aria-labelledby="hero-heading"
      className="mx-auto max-w-7xl"
      slogan={t("slogan")}
      title={
        <>
          {t("titleLine1")}
          <br />
          {t("titleLine2")}
          <br />
          <span className="text-primary">{t("titleLine3")}</span>
        </>
      }
      subtitle={t("subtitle")}
      callToAction={{
        text: t("primaryCta"),
        href: getWhatsAppUrl(tWhatsApp("consultation")),
        external: true,
      }}
      secondaryAction={{ text: t("secondaryCta"), href: "#pricing" }}
      backgroundImage={yottabyteHero.src}
      backgroundImageFallback="/images/yottabyte-hero.webp"
      backgroundImageAlt={t("imageAlt")}
      backgroundImageWidth={yottabyteHero.width}
      backgroundImageHeight={yottabyteHero.height}
    />
  )
}
