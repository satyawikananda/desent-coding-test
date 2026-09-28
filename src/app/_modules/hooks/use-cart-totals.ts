"use client"

import { useMemo } from "react"

import { useWorkspaceStore } from "../stores/workspace.store"
import type { CartTotals } from "../types/workspace.types"
import { resolveCartLine } from "../utils/helpers"

const WEEKS_PER_MONTH = 4.33
const BUNDLE_DISCOUNT = 0.2

export function useCartTotals(): CartTotals {
  const cart = useWorkspaceStore((s) => s.cart)

  return useMemo(() => {
    const items = cart
      .map(resolveCartLine)
      .filter((r): r is NonNullable<typeof r> => Boolean(r))

    const weekly = items.reduce((sum, r) => sum + r.product.weekly_price, 0)
    const monthly = Math.round(weekly * WEEKS_PER_MONTH)
    const hasBundle = items.length >= 3
    const savings = hasBundle ? Math.round(monthly * BUNDLE_DISCOUNT) : 0

    return { items, weekly, monthly, savings, hasBundle }
  }, [cart])
}
