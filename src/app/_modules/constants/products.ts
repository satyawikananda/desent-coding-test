export { chairs } from "@/data/chairs"
export { desks } from "@/data/desks"
export { lamps } from "@/data/lamps"
export { monitors } from "@/data/monitors"
export { keyboards } from "@/data/keyboards"
export type { Item } from "@/data/items.type"

import { chairs } from "@/data/chairs"
import { desks } from "@/data/desks"
import { lamps } from "@/data/lamps"
import { monitors } from "@/data/monitors"
import { keyboards } from "@/data/keyboards"
import type { Item } from "@/data/items.type"
import type { Category } from "../types/workspace.types"

export const PRODUCTS_BY_CATEGORY: Record<Category, Item[]> = {
  chair: chairs,
  desk: desks,
  monitor: monitors,
  lamp: lamps,
  keyboard: keyboards,
}

export const ALL_PRODUCTS: Item[] = [
  ...chairs,
  ...desks,
  ...monitors,
  ...lamps,
  ...keyboards,
]
