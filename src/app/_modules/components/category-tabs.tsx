"use client"

import { motion } from "motion/react"
import { Armchair, Keyboard, Lamp, Monitor, Square, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { CATEGORIES } from "../constants/doodles"
import { useWorkspaceStore } from "../stores/workspace.store"
import type { Category } from "../types/workspace.types"

const CATEGORY_META: Record<Category, { label: string; Icon: LucideIcon }> = {
  chair: { label: "Chair", Icon: Armchair },
  desk: { label: "Desk", Icon: Square },
  monitor: { label: "Monitor", Icon: Monitor },
  lamp: { label: "Lamp", Icon: Lamp },
  keyboard: { label: "Keyboard", Icon: Keyboard },
}

export function CategoryTabs() {
  const activeCategory = useWorkspaceStore((s) => s.activeCategory)
  const setActiveCategory = useWorkspaceStore((s) => s.setActiveCategory)

  return (
    <nav
      aria-label="Categories"
      className="flex w-full gap-2 overflow-x-auto md:flex-col md:gap-1 md:overflow-visible"
    >
      {CATEGORIES.map((cat) => {
        const { label, Icon } = CATEGORY_META[cat]
        const isActive = activeCategory === cat
        return (
          <motion.button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-lg px-4 py-3",
              "font-sans text-sm font-medium transition-all duration-200",
              "md:w-full",
              isActive
                ? "bg-primary font-semibold text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" strokeWidth={2} />
            <span>{label}</span>
          </motion.button>
        )
      })}
    </nav>
  )
}
