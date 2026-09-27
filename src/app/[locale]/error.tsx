"use client"

import { AppError } from "@/components/base/app-error"
import { useTranslations } from "@/lib/i18n/use-translations"

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations("error")

  return (
    <AppError
      error={error}
      reset={reset}
      title={t("title")}
      description={t("description")}
      retryLabel={t("retry")}
      homeLabel={t("backHome")}
    />
  )
}
