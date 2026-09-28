"use client"

import { motion } from "motion/react"
import { Award, CalendarDays, Clock, Globe2, Repeat, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCartTotals } from "../hooks/use-cart-totals"
import { useWorkspaceStore } from "../stores/workspace.store"
import { formatMonthly, formatWeekly } from "../utils/helpers"
import { BundleBadge } from "./bundle-badge"

const TRUST_PILLS = [
  { Icon: Zap, label: "Easy booking" },
  { Icon: Clock, label: "Same-day delivery" },
  { Icon: Repeat, label: "Flexible swaps" },
  { Icon: Globe2, label: "24/7 support" },
  { Icon: Award, label: "Premium gear" },
  { Icon: CalendarDays, label: "Flexible duration" },
] as const

export function Cart() {
  const { items, weekly, monthly, hasBundle } = useCartTotals()
  const openCheckout = useWorkspaceStore((s) => s.openCheckout)

  return (
    <aside
      className={cn("space-y-4 rounded-xl border border-border bg-card p-4")}
    >
      {/* Header */}
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Your setup
        </p>
        <p className="mt-1 font-heading text-2xl font-semibold text-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* Line items */}
      {items.length > 0 ? (
        <ul className="divide-y divide-border rounded-xl border border-border">
          {items.map((line) => (
            <li
              key={line.instanceId}
              className="flex items-center gap-2 px-3 py-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={line.product.image}
                alt=""
                className="h-8 w-8 shrink-0 rounded object-cover"
              />
              <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                {line.product.name}
              </span>
              <span className="font-mono text-xs font-medium text-muted-foreground">
                ${line.product.weekly_price}/wk
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Weekly
          </p>
          <AnimatedTotal>{formatWeekly(weekly)}</AnimatedTotal>
        </div>
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Monthly
          </p>
          <AnimatedTotal className="text-base font-semibold">
            {formatMonthly(monthly)}
          </AnimatedTotal>
        </div>
      </div>

      {/* Bundle badge */}
      <BundleBadge visible={hasBundle} />

      <div className="border-t border-border" />

      {/* Trust pills */}
      <div>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Trust
        </p>
        <ul className="space-y-1.5">
          {TRUST_PILLS.map(({ Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              {label}
            </li>
          ))}
        </ul>
      </div>

      {/* Rent CTA */}
      <Button
        size="lg"
        className="w-full"
        onClick={openCheckout}
        disabled={items.length === 0}
      >
        Rent your setup →
      </Button>
    </aside>
  )
}

function AnimatedTotal({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <motion.span
      key={children}
      initial={{ scale: 1 }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("font-mono text-sm font-medium text-foreground", className)}
    >
      {children}
    </motion.span>
  )
}
