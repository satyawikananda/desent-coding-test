"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { useTranslations } from "@/lib/i18n/use-translations"
import { cn } from "@/lib/utils"

import { PROCESS_STEPS } from "../constants/landing.constants"

export function ProcessSection() {
  const t = useTranslations("process")
  const [activeStep, setActiveStep] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-24 bg-background px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-28">
          <h2
            id="process-heading"
            className="max-w-xl font-heading text-4xl leading-[1.02] font-bold tracking-[-0.045em] text-balance sm:text-5xl lg:text-6xl"
          >
            {t("title")}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
            {t("description")}
          </p>

          <div
            className="mt-12 hidden items-center gap-4 lg:flex"
            aria-hidden="true"
          >
            <span className="h-px w-12 bg-primary" />
            <p className="font-mono text-sm text-muted-foreground">
              {t("counter", {
                current: t(`steps.${PROCESS_STEPS[activeStep].key}.number`),
                total: String(PROCESS_STEPS.length).padStart(2, "0"),
              })}
            </p>
          </div>
        </div>

        <div>
          {PROCESS_STEPS.map((step, index) => {
            const isActive = index === activeStep
            const title = t(`steps.${step.key}.title`)

            return (
              <motion.article
                key={step.key}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, transform: "translateY(32px)" }
                }
                whileInView={{ opacity: 1, transform: "translateY(0px)" }}
                viewport={{ amount: 0.45 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.56,
                        delay: index * 0.04,
                        ease: [0.23, 1, 0.32, 1],
                      }
                }
                onViewportEnter={() => setActiveStep(index)}
                className={cn(
                  "grid gap-6 border-t border-foreground/20 py-10 first:border-t-0 first:pt-0 sm:grid-cols-[5rem_1fr] sm:gap-8 lg:min-h-96 lg:content-center",
                  !isActive && "lg:text-foreground/55"
                )}
              >
                <p
                  className={cn(
                    "font-mono text-2xl font-bold transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                  aria-hidden="true"
                >
                  {t(`steps.${step.key}.number`)}
                </p>
                <div>
                  <h3 className="font-heading text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
                    {title}
                  </h3>
                  <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                    {t(`steps.${step.key}.description`)}
                  </p>
                  <ul
                    aria-label={t("outputsAriaLabel", { title })}
                    className="mt-7 grid gap-x-6 gap-y-2 sm:grid-cols-2"
                  >
                    {step.outputs.map((output) => (
                      <li
                        key={output}
                        className="text-sm font-semibold text-foreground/80"
                      >
                        <span aria-hidden="true" className="mr-2 text-primary">
                          /
                        </span>
                        {t(`steps.${step.key}.outputs.${output}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
