import { useTranslations } from "@/lib/i18n/use-translations"

import {
  getWhatsAppUrl,
  NAVIGATION_ITEMS,
} from "../constants/landing.constants"
import { Reveal } from "./reveal"

export function SiteFooter() {
  const t = useTranslations("footer")
  const tCommon = useTranslations("common")
  const tNav = useTranslations("nav")
  const tWhatsApp = useTranslations("whatsapp")

  return (
    <footer className="border-t border-foreground/20 bg-background px-4 pt-16 sm:px-6 lg:px-8 lg:pt-24">
      <Reveal className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-b border-foreground/20 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.6fr_0.6fr] lg:pb-20">
          <div>
            <a
              href="#top"
              className="font-heading text-2xl font-extrabold tracking-[-0.05em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {tCommon("brand")}
              <span className="text-primary">.</span>
            </a>
            <p className="mt-6 max-w-xs text-lg leading-8 font-semibold">
              {t("sloganLine1")}
              <br />
              {t("sloganLine2")}
              <br />
              {t("sloganLine3")}
            </p>
          </div>

          <nav aria-label={tNav("ariaFooter")}>
            <h2 className="font-mono text-xs font-bold text-muted-foreground uppercase">
              {t("navigationTitle")}
            </h2>
            <ul className="mt-5 flex flex-col gap-2">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-10 items-center font-semibold underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {tNav(`items.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-xs font-bold text-muted-foreground uppercase">
              {t("contactTitle")}
            </h2>
            <a
              href={getWhatsAppUrl(tWhatsApp("consultation"))}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-10 items-center font-semibold underline decoration-primary decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {tCommon("whatsapp")}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          {/* Passed as a string so ICU doesn't group it as "2,026". */}
          <p>{t("copyright", { year: String(new Date().getFullYear()) })}</p>
          <p>{t("tagline")}</p>
        </div>

        <p
          aria-hidden="true"
          className="overflow-hidden font-heading text-[clamp(3.8rem,14vw,11rem)] leading-[0.75] font-extrabold tracking-[-0.08em] text-foreground/[0.07]"
        >
          {tCommon("brand")}
        </p>
      </Reveal>
    </footer>
  )
}
