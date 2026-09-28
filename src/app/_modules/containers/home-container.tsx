"use client"

import AppCanvas from "@/components/base/app-canvas"

import { Cart } from "../components/cart"
import { CategoryTabs } from "../components/category-tabs"
import { CheckoutModal } from "../components/checkout-modal"
import { ItemGrid } from "../components/item-grid"
import { TemplatePicker } from "../components/template-picker"

const PANEL_BASE =
  "pointer-events-auto rounded-xl border border-border bg-card/95 shadow-lg backdrop-blur-md"

export function HomeContainer() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Full-viewport canvas (behind everything) */}
      <AppCanvas />

      {/* Floating overlay panels */}
      <div className="pointer-events-none absolute inset-0 z-10 p-4 md:p-6">
        {/* Top-center: floating header pill */}
        <header
          className={`${PANEL_BASE} absolute left-1/2 top-4 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-5 py-2 md:top-6`}
        >
          <span className="font-heading text-sm font-bold tracking-tight text-foreground">
            monis.rent
          </span>
          <span className="hidden text-[11px] font-medium text-muted-foreground sm:inline">
            · workspace studio
          </span>
        </header>
        <div className="absolute left-4 top-4 flex h-[calc(100vh-32px)] w-65 flex-col gap-3 md:left-6 md:top-6 md:h-[calc(100vh-48px)]">

          <section
            className={`${PANEL_BASE} flex max-h-[45%] shrink-0 flex-col overflow-y-auto p-3`}
          >
            <TemplatePicker />
          </section>


          <section
            className={`${PANEL_BASE} flex min-h-0 flex-1 flex-col p-3`}
          >
            <div className="shrink-0">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Categories
              </p>
              <CategoryTabs />
            </div>
            <div className="mt-3 flex-1 overflow-y-auto border-t border-border pt-3">
              <ItemGrid />
            </div>
          </section>
        </div>

        {/* Right: Cart */}
        <div
          className={`${PANEL_BASE} absolute right-4 top-4 max-h-[calc(100vh-32px)] w-75 overflow-y-auto p-4 md:right-6 md:top-6`}
        >
          <Cart />
        </div>
      </div>

      <CheckoutModal />
    </div>
  )
}
