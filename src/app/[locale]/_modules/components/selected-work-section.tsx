import { useTranslations } from "@/lib/i18n/use-translations"

import { Reveal } from "./reveal"
import { SectionHeading } from "./section-heading"

export function SelectedWorkSection() {
  const t = useTranslations("work")

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 border-y border-foreground/20 bg-background px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            id="work-heading"
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-14 border-y border-foreground/25">
          <div
            data-content-status="todo"
            className="grid min-h-80 lg:grid-cols-[0.72fr_1.28fr]"
          >
            <div className="relative min-h-56 overflow-hidden border-b border-foreground/20 bg-secondary lg:border-r lg:border-b-0">
              <p
                aria-hidden="true"
                className="absolute -bottom-3 -left-2 font-heading text-[clamp(5rem,15vw,10rem)] leading-none font-extrabold tracking-[-0.09em] text-primary"
              >
                {t("decoration")}
              </p>
            </div>
            <div className="flex flex-col justify-end gap-10 px-1 py-9 sm:p-10 lg:p-14">
              <div>
                <p className="mb-5 font-mono text-sm text-primary">
                  {t("eyebrow")}
                </p>
                <h3 className="max-w-2xl font-heading text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
                  {t("placeholderTitle")}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {t("placeholderDescription")}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
