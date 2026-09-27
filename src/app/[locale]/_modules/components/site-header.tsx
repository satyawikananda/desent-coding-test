"use client"

import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import AppImageFallback from "@/components/base/app-image-fallback"
import { useTranslations } from "@/lib/i18n/use-translations"
import { cn } from "@/lib/utils"
import { yottabyteLogo } from "@/shared/assets"

import {
  getWhatsAppUrl,
  NAVIGATION_ITEMS,
} from "../constants/landing.constants"
import { LocaleSwitcher } from "./locale-switcher"

const MOBILE_MENU_FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function BrandLink({
  brand,
  className,
  inverted = false,
  onClick,
  preload = false,
}: {
  brand: string
  className?: string
  inverted?: boolean
  onClick?: () => void
  preload?: boolean
}) {
  return (
    <a
      href="#top"
      className={cn(
        "flex min-h-11 items-center gap-2.5 font-heading text-lg font-extrabold tracking-[-0.045em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        className
      )}
      onClick={onClick}
    >
      <span className="block size-9 shrink-0" aria-hidden="true">
        <AppImageFallback
          src={yottabyteLogo.src}
          placeholderSrc="/images/yottabyte-logo.webp"
          alt=""
          width={yottabyteLogo.width}
          height={yottabyteLogo.height}
          className="h-full w-full object-contain"
          preload={preload}
        />
      </span>
      {brand}
      <span className={inverted ? "text-background" : "text-primary"}>.</span>
    </a>
  )
}

export function SiteHeader() {
  const t = useTranslations("nav")
  const tCommon = useTranslations("common")
  const tWhatsApp = useTranslations("whatsapp")
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const shouldRestoreFocusRef = useRef(true)
  const shouldReduceMotion = useReducedMotion()

  const whatsAppUrl = getWhatsAppUrl(tWhatsApp("consultation"))

  useEffect(() => {
    if (!isOpen) return

    const previousBodyOverflow = document.body.style.overflow
    const menuButton = menuButtonRef.current
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    return () => {
      document.body.style.overflow = previousBodyOverflow

      if (shouldRestoreFocusRef.current) {
        menuButton?.focus()
      }
    }
  }, [isOpen])

  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 768px)")

    function closeMenuOnDesktop(event: MediaQueryListEvent) {
      if (!event.matches) return

      shouldRestoreFocusRef.current = false
      setIsOpen(false)
    }

    desktopMediaQuery.addEventListener("change", closeMenuOnDesktop)
    return () =>
      desktopMediaQuery.removeEventListener("change", closeMenuOnDesktop)
  }, [])

  function openMenu() {
    shouldRestoreFocusRef.current = true
    setIsOpen(true)
  }

  function closeMenu(restoreFocus = true) {
    shouldRestoreFocusRef.current = restoreFocus
    setIsOpen(false)
  }

  function handleMobileMenuKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault()
      closeMenu()
      return
    }

    if (event.key !== "Tab") return

    const focusableElements = Array.from(
      menuPanelRef.current?.querySelectorAll<HTMLElement>(
        MOBILE_MENU_FOCUSABLE_SELECTOR
      ) ?? []
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements.at(-1)

    if (!firstElement || !lastElement) return

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-foreground/15 bg-background/96 supports-backdrop-filter:bg-background/90 supports-backdrop-filter:backdrop-blur-xl",
        isOpen && "z-50"
      )}
    >
      <div
        className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
        inert={isOpen ? true : undefined}
      >
        <BrandLink brand={tCommon("brand")} preload />

        <nav aria-label={t("ariaMain")} className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative flex min-h-11 items-center text-sm font-semibold after:absolute after:right-0 after:bottom-1 after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  {t(`items.${item.key}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher className="hidden md:inline-flex" />

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className="yt-tactile hidden min-h-11 items-center rounded-md border-2 border-foreground bg-primary px-4 text-sm font-bold text-primary-foreground shadow-[3px_3px_0_var(--foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:inline-flex"
          >
            {tCommon("consultation")}
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={isOpen}
            aria-controls={menuId}
            aria-haspopup="dialog"
            aria-label={t("openMenu")}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border border-foreground/30 bg-background transition-colors duration-200 hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:hidden"
            onClick={openMenu}
          >
            <Menu aria-hidden="true" className="size-5" strokeWidth={2} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            ref={menuPanelRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label={t("ariaMobile")}
            initial={shouldReduceMotion ? false : { opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.32,
              ease: [0.23, 1, 0.32, 1],
            }}
            onKeyDown={handleMobileMenuKeyDown}
            className="fixed inset-0 z-50 flex min-h-dvh flex-col overflow-y-auto bg-primary text-primary-foreground md:hidden"
          >
            <div className="shrink-0 border-b border-primary-foreground/20 px-4 pt-[env(safe-area-inset-top)] sm:px-6">
              <div className="flex h-18 items-center justify-between gap-4">
                <BrandLink
                  brand={tCommon("brand")}
                  inverted
                  className="text-primary-foreground focus-visible:outline-primary-foreground"
                  onClick={() => closeMenu(false)}
                />

                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label={t("closeMenu")}
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md border-2 border-primary-foreground bg-primary-foreground text-primary transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground active:scale-[0.96]"
                  onClick={() => closeMenu()}
                >
                  <X aria-hidden="true" className="size-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <nav
              aria-label={t("ariaMobile")}
              className="flex flex-1 flex-col px-4 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6"
            >
              <ul className="flex flex-1 flex-col">
                {NAVIGATION_ITEMS.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.28,
                      delay: shouldReduceMotion ? 0 : 0.1 + index * 0.045,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <a
                      href={item.href}
                      className="group/mobile-link flex min-h-18 items-center border-b border-primary-foreground/20 font-heading text-3xl font-bold tracking-[-0.04em] transition-colors duration-200 hover:bg-primary-foreground hover:text-primary focus-visible:bg-primary-foreground focus-visible:text-primary focus-visible:outline-none sm:text-4xl"
                      onClick={() => closeMenu(false)}
                    >
                      <span className="transition-transform duration-200 group-hover/mobile-link:translate-x-2 group-focus-visible/mobile-link:translate-x-2">
                        {t(`items.${item.key}`)}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.28,
                  delay: shouldReduceMotion ? 0 : 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="mt-10 grid shrink-0 gap-4"
              >
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="yt-tactile flex min-h-14 items-center justify-center rounded-md border-2 border-primary-foreground bg-background px-5 font-bold text-foreground shadow-[3px_3px_0_var(--primary-foreground)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"
                  onClick={() => closeMenu(false)}
                >
                  {tCommon("consultation")}
                </a>

                <LocaleSwitcher className="w-fit justify-self-center border-primary-foreground bg-background p-1" />
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
