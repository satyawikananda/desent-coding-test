import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Sora, Ubuntu_Mono } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getTranslations } from "next-intl/server"

import "@/styles/globals.css"
import AppPaddingLayout from "@/components/base/app-padding-layout"
import { Modals } from "@/components/base/app-modals"
import BprogressProvider from "@/components/provider/bprogress-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { localeHtmlLang, type Locale } from "@/cfgs/i18n.cfg"
import { routing } from "@/lib/i18n/routing"
import { getSEOTags } from "@/lib/seo"
import { cn } from "@/lib/utils"

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const ubuntuMono = Ubuntu_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
})

export function generateStaticParams() {
  return routing.locales.map((locale: Locale) => ({ locale }))
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations("seo")

  return getSEOTags({
    locale,
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    ogImageAlt: t("ogImageAlt"),
  }) as Metadata
}

export default async function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html
      lang={localeHtmlLang[locale as Locale]}
      suppressHydrationWarning
      className={cn(
        "font-sans antialiased",
        ubuntuMono.variable,
        plusJakartaSans.variable,
        sora.variable
      )}
    >
      <body className="min-h-dvh">
        <NextIntlClientProvider>
          <ThemeProvider>
            <Toaster />
            <Modals />
            <BprogressProvider>
              <TooltipProvider>
                <AppPaddingLayout as="main">{children}</AppPaddingLayout>
              </TooltipProvider>
            </BprogressProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
