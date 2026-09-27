/**
 * Structural data for the landing page.
 *
 * All user-facing copy lives in `src/messages/{id,en}.json`. What stays here is
 * the shape of the page: ordering, anchors, which package is highlighted, and
 * which features are on/off per tier. Every `*Key` field is a lookup into the
 * message dictionaries — keep the two in sync when adding an item.
 */

export const NAVIGATION_ITEMS = [
  { key: "services", href: "#services" },
  { key: "work", href: "#work" },
  { key: "process", href: "#process" },
  { key: "pricing", href: "#pricing" },
] as const

export type NavigationItem = (typeof NAVIGATION_ITEMS)[number]

export const STAT_KEYS = ["years", "projects", "services"] as const

export type StatKey = (typeof STAT_KEYS)[number]

export interface ServiceItem {
  key: "landingPage" | "companyProfile" | "customWebsite"
  href?: string
  /** Custom work has no fixed price, so its CTA opens WhatsApp instead. */
  custom?: boolean
}

export const SERVICES: readonly ServiceItem[] = [
  { key: "landingPage", href: "#pricing" },
  { key: "companyProfile", href: "#pricing" },
  { key: "customWebsite", custom: true },
]

export interface ProcessStep {
  key: "discover" | "planDesign" | "buildIterate" | "launchSupport"
  outputs: readonly string[]
}

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    key: "discover",
    outputs: ["requirements", "goals", "contentDirection", "projectScope"],
  },
  {
    key: "planDesign",
    outputs: ["informationArchitecture", "uiDirection", "responsivePlanning"],
  },
  {
    key: "buildIterate",
    outputs: [
      "development",
      "responsiveImplementation",
      "revision",
      "performance",
    ],
  },
  {
    key: "launchSupport",
    outputs: ["qa", "deployment", "handover", "bugWarranty"],
  },
]

export type PricingCategory = "landing-page" | "company-profile"

export type PackageKey = "silver" | "gold" | "platinum"

export interface PricingFeature {
  /** Lookup into `pricing.features.*`. */
  labelKey: string
  /** `true`/`false` render as icons; a string is a lookup into `pricing.values.*`. */
  value: boolean | string
}

export interface PricingPackage {
  key: PackageKey
  /** Lookup into `pricing.prices.*`. */
  priceKey: string
  popular?: boolean
  features: readonly PricingFeature[]
}

export interface PricingGroup {
  /** Lookup into `pricing.categories.*`. */
  labelKey: "landingPage" | "companyProfile"
  packages: readonly PricingPackage[]
}

export const PRICING: Record<PricingCategory, PricingGroup> = {
  "landing-page": {
    labelKey: "landingPage",
    packages: [
      {
        key: "silver",
        priceKey: "landingPageSilver",
        features: [
          { labelKey: "sectionCount", value: "maxSections5" },
          { labelKey: "responsive", value: true },
          { labelKey: "whatsappCta", value: true },
          { labelKey: "googleMaps", value: true },
          { labelKey: "basicSeo", value: true },
          { labelKey: "socialMediaLink", value: true },
          { labelKey: "galleryTestimonial", value: false },
          { labelKey: "contactForm", value: false },
          { labelKey: "googleAnalytics", value: false },
          { labelKey: "advancedSeo", value: false },
          { labelKey: "searchConsoleSetup", value: false },
          { labelKey: "performance", value: "basic" },
          { labelKey: "revision", value: "revision1x" },
          { labelKey: "bugWarranty", value: "warranty7d" },
        ],
      },
      {
        key: "gold",
        priceKey: "landingPageGold",
        popular: true,
        features: [
          { labelKey: "sectionCount", value: "maxSections8" },
          { labelKey: "responsive", value: true },
          { labelKey: "whatsappCta", value: true },
          { labelKey: "googleMaps", value: true },
          { labelKey: "basicSeo", value: true },
          { labelKey: "socialMediaLink", value: true },
          { labelKey: "galleryTestimonial", value: true },
          { labelKey: "contactForm", value: true },
          { labelKey: "googleAnalytics", value: true },
          { labelKey: "advancedSeo", value: false },
          { labelKey: "searchConsoleSetup", value: false },
          { labelKey: "performance", value: true },
          { labelKey: "revision", value: "revision2x" },
          { labelKey: "bugWarranty", value: "warranty14d" },
        ],
      },
      {
        key: "platinum",
        priceKey: "landingPagePlatinum",
        features: [
          { labelKey: "sectionCount", value: "maxSections10" },
          { labelKey: "responsive", value: true },
          { labelKey: "whatsappCta", value: true },
          { labelKey: "googleMaps", value: true },
          { labelKey: "basicSeo", value: true },
          { labelKey: "socialMediaLink", value: true },
          { labelKey: "galleryTestimonial", value: true },
          { labelKey: "contactForm", value: true },
          { labelKey: "googleAnalytics", value: true },
          { labelKey: "advancedSeo", value: true },
          { labelKey: "searchConsoleSetup", value: true },
          { labelKey: "performance", value: true },
          { labelKey: "revision", value: "revision3x" },
          { labelKey: "bugWarranty", value: "warranty30d" },
        ],
      },
    ],
  },
  "company-profile": {
    labelKey: "companyProfile",
    packages: [
      {
        key: "silver",
        priceKey: "companyProfileSilver",
        features: [
          { labelKey: "pageCount", value: "maxPages3" },
          { labelKey: "cms", value: true },
          { labelKey: "responsive", value: true },
          { labelKey: "whatsappCta", value: true },
          { labelKey: "googleMaps", value: true },
          { labelKey: "basicSeo", value: true },
          { labelKey: "contactFormShort", value: true },
          { labelKey: "galleryTestimonial", value: false },
          { labelKey: "googleAnalytics", value: false },
          { labelKey: "searchConsole", value: false },
          { labelKey: "blog", value: false },
          { labelKey: "advancedSeo", value: false },
          { labelKey: "performance", value: "basic" },
          { labelKey: "cmsTraining", value: true },
        ],
      },
      {
        key: "gold",
        priceKey: "companyProfileGold",
        popular: true,
        features: [
          { labelKey: "pageCount", value: "maxPages56" },
          { labelKey: "cms", value: true },
          { labelKey: "responsive", value: true },
          { labelKey: "whatsappCta", value: true },
          { labelKey: "googleMaps", value: true },
          { labelKey: "basicSeo", value: true },
          { labelKey: "contactFormShort", value: true },
          { labelKey: "galleryTestimonial", value: true },
          { labelKey: "googleAnalytics", value: true },
          { labelKey: "searchConsole", value: true },
          { labelKey: "blog", value: false },
          { labelKey: "advancedSeo", value: false },
          { labelKey: "performance", value: true },
          { labelKey: "cmsTraining", value: true },
        ],
      },
      {
        key: "platinum",
        priceKey: "companyProfilePlatinum",
        features: [
          { labelKey: "pageCount", value: "maxPages810" },
          { labelKey: "cms", value: true },
          { labelKey: "responsive", value: true },
          { labelKey: "whatsappCta", value: true },
          { labelKey: "googleMaps", value: true },
          { labelKey: "basicSeo", value: true },
          { labelKey: "contactFormShort", value: true },
          { labelKey: "galleryTestimonial", value: true },
          { labelKey: "googleAnalytics", value: true },
          { labelKey: "searchConsole", value: true },
          { labelKey: "blog", value: true },
          { labelKey: "advancedSeo", value: true },
          { labelKey: "performance", value: true },
          { labelKey: "cmsTraining", value: true },
        ],
      },
    ],
  },
}

// TODO: Replace this with Yottabyte's real international-format WhatsApp number.
export const WHATSAPP_NUMBER = ""

export function getWhatsAppUrl(message: string) {
  const phone = WHATSAPP_NUMBER.trim()
  const baseUrl = phone ? `https://wa.me/${phone}` : "https://wa.me/"

  return `${baseUrl}?text=${encodeURIComponent(message)}`
}
