import type { MetadataRoute } from "next"

import { locales } from "@/cfgs/i18n.cfg"
import { siteUrl } from "@/lib/seo"

const routes = ["/"] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => {
      const path = `/${locale}${route === "/" ? "" : route}`

      return {
        url: new URL(path, siteUrl).toString(),
        changeFrequency: route === "/" ? "monthly" : "weekly",
        priority: route === "/" ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((alternate) => [
              alternate,
              new URL(
                `/${alternate}${route === "/" ? "" : route}`,
                siteUrl
              ).toString(),
            ])
          ),
        },
      } satisfies MetadataRoute.Sitemap[number]
    })
  )
}
