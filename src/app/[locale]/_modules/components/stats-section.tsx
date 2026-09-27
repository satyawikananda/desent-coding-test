import { useTranslations } from "@/lib/i18n/use-translations"

import { STAT_KEYS } from "../constants/landing.constants"
import { Reveal } from "./reveal"

export function StatsSection() {
  const t = useTranslations("stats")

  return (
    <section
      aria-label={t("ariaLabel")}
      className="border-y border-foreground/20 bg-background"
    >
      <div className="mx-auto grid max-w-7xl sm:grid-cols-3 sm:px-6 lg:px-8">
        {STAT_KEYS.map((key, index) => (
          <Reveal
            key={key}
            delay={index * 0.06}
            className="border-b border-foreground/20 px-4 py-8 last:border-b-0 sm:border-r sm:border-b-0 sm:px-8 sm:last:border-r-0 lg:py-10"
          >
            <p className="font-heading text-5xl leading-none font-extrabold tracking-[-0.06em] lg:text-6xl">
              {t(`items.${key}.value`)}
            </p>
            <p className="mt-4 font-mono text-xs font-bold uppercase">
              {t(`items.${key}.label`)}
            </p>
            <p className="mt-2 max-w-40 text-sm leading-6 text-muted-foreground">
              {t(`items.${key}.description`)}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
