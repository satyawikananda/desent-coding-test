import type { Metadata } from "next"

import { defaultLocale, locales, type Locale } from "@/cfgs/i18n.cfg"

export type GetSEOTagsProps = Metadata & {
  canonicalUrlRelative?: string
  extraTags?: Record<string, string>
  locale?: string
  ogImageAlt?: string
}

export const siteUrl = new URL("https://yottabyte.web.id")

const config = {
  siteUrl,
  appName: "Yottabyte",
}

const ogLocaleByLocale: Record<Locale, string> = {
  id: "id_ID",
  en: "en_US",
}

export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
  locale = defaultLocale,
  ogImageAlt,
}: GetSEOTagsProps = {}) => {
  const activeLocale = (
    locales as readonly string[]
  ).includes(locale)
    ? (locale as Locale)
    : defaultLocale

  const ogImage = {
    url: new URL("/og", config.siteUrl),
    width: 1200,
    height: 630,
    alt: ogImageAlt ?? config.appName,
  }

  // Canonical + hreflang both live under the locale prefix, because routing
  // uses `localePrefix: 'always'`.
  const path = canonicalUrlRelative ?? "/"
  const localizedPath = `/${activeLocale}${path === "/" ? "" : path}`

  return {
    title,
    description,
    keywords,
    applicationName: config.appName,
    metadataBase: config.siteUrl,

    openGraph: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      url: openGraph?.url || new URL(localizedPath, config.siteUrl),
      siteName: config.appName,
      locale: ogLocaleByLocale[activeLocale],
      type: "website",
      images: openGraph?.images || [ogImage],
    },

    twitter: {
      title: openGraph?.title || title,
      description: openGraph?.description || description,
      card: "summary_large_image",
      images: [ogImage],
    },

    alternates: {
      canonical: localizedPath,
      languages: Object.fromEntries(
        locales.map((item) => [item, `/${item}${path === "/" ? "" : path}`])
      ),
    },

    ...extraTags,
  }
}

export const isProductionHost = (host: string | null | undefined): boolean =>
  host?.split(':')[0].toLowerCase() === siteUrl.hostname.toLowerCase();