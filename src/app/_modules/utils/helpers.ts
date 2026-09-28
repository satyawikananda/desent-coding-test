import { ALL_PRODUCTS, PRODUCTS_BY_CATEGORY } from "../constants/products"
import type { CartItem, CartLine } from "../types/workspace.types"
import type { Item } from "../../../data/items.type"

export function formatWeekly(weekly: number): string {
  return `$${weekly}/wk`
}

export function formatMonthly(monthly: number): string {
  return `$${monthly}/mo`
}

export function getProductById(id: number): Item | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id)
}

export function getProductsByCategory(category: CartItem extends never ? never : string): Item[] {
  return (PRODUCTS_BY_CATEGORY as Record<string, Item[]>)[category] ?? []
}

export function resolveCartLine(ci: CartItem): CartLine | undefined {
  const product = getProductById(ci.productId)
  if (!product) return undefined
  return { instanceId: ci.instanceId, doodleId: ci.doodleId, product }
}
