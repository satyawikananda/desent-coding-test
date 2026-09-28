"use client"

import { DOODLES_BY_CATEGORY } from "../constants/doodles"
import { useWorkspaceStore } from "../stores/workspace.store"
import type { Doodle } from "../types/workspace.types"

import { ItemCard } from "./item-card"

export function ItemGrid() {
  const activeCategory = useWorkspaceStore((s) => s.activeCategory)
  const doodles: Doodle[] = DOODLES_BY_CATEGORY[activeCategory] ?? []
  
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {doodles.map((d) => (
        <ItemCard key={d.id} doodle={d} />
      ))}
    </div>
  )
}
