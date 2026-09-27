"use client"

import { useLocale } from "next-intl"
import type { MouseEvent } from "react"

import { locales, localeNames, type Locale } from "@/cfgs/i18n.cfg"
import { setLocaleCookie } from "@/lib/i18n/locale-cookie"
import { Link, usePathname } from "@/lib/i18n/navigation"
import { useTranslations } from "@/lib/i18n/use-translations"
import { cn } from "@/lib/utils"

interface LocaleSwitcherProps {
  className?: string
}

/**
 * Segmented ID/EN toggle. Rendered as real links so each locale is
 * crawlable and works without JS; the cookie write is a progressive
 * enhancement that remembers the choice for later visits.
 */
export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const t = useTranslations("locale")
  const activeLocale = useLocale() as Locale
  const pathname = usePathname()

  function handleLocaleChange(
    event: MouseEvent<HTMLAnchorElement>,
    locale: Locale,
    isActive: boolean
  ) {
    setLocaleCookie(locale)

    if (isActive) {
      event.preventDefault()
      return
    }

    const isModifiedClick =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

    if (event.button !== 0 || isModifiedClick) return

    event.preventDefault()

    // The locale segment owns the root layout. Reload the document so
    // next-themes can run its bootstrap script during document rendering.
    window.location.assign(event.currentTarget.href)
  }

  return (
    <div
      role="group"
      aria-label={t("switcherLabel")}
      className={cn(
        "inline-flex items-center rounded-md border border-foreground/30 p-0.5",
        className
      )}
    >
      {locales.map((locale) => {
        const isActive = locale === activeLocale

        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            aria-current={isActive ? "true" : undefined}
            title={localeNames[locale]}
            onClick={(event) => handleLocaleChange(event, locale, isActive)}
            className={cn(
              "inline-flex min-h-9 min-w-9 items-center justify-center rounded-sm px-2 font-mono text-xs font-bold uppercase transition-colors duration-200",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            {locale}
          </Link>
        )
      })}
    </div>
  )
}
