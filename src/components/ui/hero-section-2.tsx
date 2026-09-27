"use client"

import type { ImageProps } from "next/image"
import { forwardRef } from "react"
import { Globe2, MapPin, Phone } from "lucide-react"
import {
  type HTMLMotionProps,
  motion,
  type Variants,
  useReducedMotion,
} from "motion/react"

import AppImageFallback from "@/components/base/app-image-fallback"
import { cn } from "@/lib/utils"

type InfoType = "website" | "phone" | "address"

const infoIcons = {
  website: Globe2,
  phone: Phone,
  address: MapPin,
} satisfies Record<InfoType, React.ComponentType<React.SVGProps<SVGSVGElement>>>

function InfoIcon({ type }: { type: InfoType }) {
  const Icon = infoIcons[type]

  return (
    <Icon
      aria-hidden="true"
      className="size-5 shrink-0 text-primary"
      strokeWidth={1.75}
    />
  )
}

interface HeroAction {
  text: string
  href: string
  external?: boolean
}

interface HeroSectionProps extends Omit<
  HTMLMotionProps<"section">,
  "children" | "title"
> {
  headingId?: string
  logo?: {
    url: ImageProps["src"]
    fallbackUrl: ImageProps["src"]
    alt: string
    text?: string
    width: number
    height: number
  }
  slogan?: string
  title: React.ReactNode
  subtitle: string
  callToAction: HeroAction
  secondaryAction?: HeroAction
  backgroundImage: ImageProps["src"]
  backgroundImageFallback: ImageProps["src"]
  backgroundImageAlt: string
  backgroundImageWidth: number
  backgroundImageHeight: number
  contactInfo?: Partial<Record<InfoType, string>>
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, transform: "translateY(20px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: {
      duration: 0.48,
      ease: [0.23, 1, 0.32, 1],
    },
  },
}

function actionTarget(action: HeroAction) {
  return action.external ? { target: "_blank" as const, rel: "noreferrer" } : {}
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      className,
      headingId,
      logo,
      slogan,
      title,
      subtitle,
      callToAction,
      secondaryAction,
      backgroundImage,
      backgroundImageFallback,
      backgroundImageAlt,
      backgroundImageWidth,
      backgroundImageHeight,
      contactInfo,
      ...props
    },
    ref
  ) => {
    const shouldReduceMotion = useReducedMotion()
    const contactEntries = contactInfo
      ? (Object.entries(contactInfo) as [InfoType, string][]).filter(
          ([, value]) => Boolean(value)
        )
      : []

    return (
      <motion.section
        ref={ref}
        className={cn(
          "relative grid w-full overflow-hidden bg-background text-foreground lg:grid-cols-[1.08fr_0.92fr]",
          className
        )}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        variants={containerVariants}
        {...props}
      >
        <div className="flex min-h-[calc(100dvh-4.5rem)] flex-col justify-center px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <motion.header className="mb-7" variants={itemVariants}>
            {logo ? (
              <div className="flex items-center gap-3">
                <span className="block size-10 shrink-0">
                  <AppImageFallback
                    src={logo.url}
                    placeholderSrc={logo.fallbackUrl}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-full w-full object-contain"
                    priority
                  />
                </span>
                <div>
                  {logo.text ? (
                    <p className="font-heading text-lg font-bold">
                      {logo.text}
                    </p>
                  ) : null}
                  {slogan ? (
                    <p className="font-mono text-xs font-bold tracking-[0.16em] text-primary uppercase">
                      {slogan}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : slogan ? (
              <p className="font-mono text-xs font-bold tracking-[0.16em] text-primary uppercase sm:text-sm">
                {slogan}
              </p>
            ) : null}
          </motion.header>

          <motion.div variants={containerVariants}>
            <motion.h1
              id={headingId}
              className="font-heading text-[clamp(2.8rem,10vw,3.5rem)] leading-[0.94] font-extrabold tracking-[-0.065em] text-balance lg:text-[clamp(4.25rem,5.6vw,6.4rem)]"
              variants={itemVariants}
            >
              {title}
            </motion.h1>
            <motion.div
              aria-hidden="true"
              className="my-7 h-1 w-20 bg-primary"
              variants={itemVariants}
            />
            <motion.p
              className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
              variants={itemVariants}
            >
              {subtitle}
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col items-stretch gap-4 min-[420px]:flex-row min-[420px]:items-center"
              variants={itemVariants}
            >
              <a
                href={callToAction.href}
                className="yt-tactile inline-flex min-h-12 items-center justify-center rounded-md border-2 border-foreground bg-primary px-5 py-3 font-semibold whitespace-nowrap text-primary-foreground shadow-[3px_3px_0_var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                {...actionTarget(callToAction)}
              >
                {callToAction.text}
              </a>
              {secondaryAction ? (
                <a
                  href={secondaryAction.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-foreground/35 bg-background px-5 py-3 font-semibold whitespace-nowrap text-foreground transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-foreground hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring active:scale-[0.98]"
                  {...actionTarget(secondaryAction)}
                >
                  {secondaryAction.text}
                </a>
              ) : null}
            </motion.div>
          </motion.div>

          {contactEntries.length > 0 ? (
            <motion.footer className="mt-12" variants={itemVariants}>
              <ul className="grid gap-5 text-sm text-muted-foreground sm:grid-cols-3">
                {contactEntries.map(([type, value]) => (
                  <li key={type} className="flex items-center gap-2.5">
                    <InfoIcon type={type} />
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </motion.footer>
          ) : null}
        </div>

        <motion.div
          className="relative min-h-104 overflow-hidden bg-secondary lg:min-h-[calc(100dvh-4.5rem)]"
          initial={
            shouldReduceMotion
              ? false
              : { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }
          }
          animate={{
            clipPath: "polygon(16% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 0.9, ease: [0.23, 1, 0.32, 1] }
          }
        >
          <div className="absolute inset-0 flex items-center justify-center px-8 py-10 sm:px-14 lg:px-10">
            <AppImageFallback
              src={backgroundImage}
              placeholderSrc={backgroundImageFallback}
              alt={backgroundImageAlt}
              width={backgroundImageWidth}
              height={backgroundImageHeight}
              sizes="(max-width: 1023px) 100vw, 42vw"
              className="h-full w-full object-contain drop-shadow-[0_18px_22px_rgba(75,49,42,0.08)]"
              priority
            />
          </div>
        </motion.div>
      </motion.section>
    )
  }
)

HeroSection.displayName = "HeroSection"

export { HeroSection, type HeroSectionProps }
