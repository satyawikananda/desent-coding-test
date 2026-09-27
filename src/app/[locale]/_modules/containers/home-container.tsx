import { StackFeatureSection } from "@/app/[locale]/_modules/components/stack-feature-section"
import { useTranslations } from "@/lib/i18n/use-translations"

import { HeroSection } from "../components/hero-section"
import { PricingSection } from "../components/pricing-section"
import { ProcessSection } from "../components/process-section"
import { SelectedWorkSection } from "../components/selected-work-section"
import { ServicesSection } from "../components/services-section"
import { SiteFooter } from "../components/site-footer"
import { SiteHeader } from "../components/site-header"
import { StatsSection } from "../components/stats-section"
import { getWhatsAppUrl } from "../constants/landing.constants"

function HomeContainer() {
  const t = useTranslations("common")
  const tWhatsApp = useTranslations("whatsapp")

  return (
    <div className="-mx-4 -mt-6 overflow-clip md:-mx-8 lg:-mx-16 xl:-mx-32">
      <a
        href="#page-content"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-md border-2 border-foreground bg-background px-4 py-3 font-semibold shadow-[4px_4px_0_var(--primary)] transition-transform focus:translate-y-0"
      >
        {t("skipToContent")}
      </a>
      <SiteHeader />
      <div id="page-content">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <SelectedWorkSection />
        <ProcessSection />
        <PricingSection />
        <StackFeatureSection
          primaryCtaHref={getWhatsAppUrl(tWhatsApp("consultation"))}
          secondaryCtaHref="#pricing"
        />
      </div>
      <SiteFooter />
    </div>
  )
}

export default HomeContainer
