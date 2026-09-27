import { NotFoundGlitch } from "@/components/base/app-not-found"
import { useTranslations } from "@/lib/i18n/use-translations"

export default function LocaleNotFound() {
  const t = useTranslations("notFound")

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4">
      <NotFoundGlitch
        code={t("code")}
        title={t("title")}
        description={t("description")}
        homeLabel={t("homeLabel")}
        browseLabel={t("browseLabel")}
      />
    </div>
  )
}
