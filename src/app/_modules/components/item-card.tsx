"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"
import { useWorkspaceStore } from "../stores/workspace.store"
import type { Doodle } from "../types/workspace.types"

type Props = {
  doodle: Doodle
}

export function ItemCard({ doodle }: Props) {
  const addDoodle = useWorkspaceStore((s) => s.addDoodle)

  return (
    <motion.button
      type="button"
      onClick={() => addDoodle(doodle.id)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn(
        "group flex flex-col items-start gap-2 rounded-xl border border-border bg-card p-3",
        "cursor-pointer text-left transition-shadow hover:border-primary/40 hover:shadow-sm"
      )}
    >
      <div className="flex h-16 w-full items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={doodle.src}
          alt=""
          draggable={false}
          className="h-full w-auto max-w-full object-contain"
        />
      </div>
      <p className="font-heading text-[13px] font-semibold leading-snug text-foreground">
        {labelFor(doodle.category)}
      </p>
      <p className="text-[11px] leading-snug text-muted-foreground/70">
        Tap to add to your setup
      </p>
    </motion.button>
  )
}

function labelFor(category: Doodle["category"]): string {
  switch (category) {
    case "chair":
      return "Chair"
    case "desk":
      return "Desk"
    case "monitor":
      return "Monitor"
    case "lamp":
      return "Lamp"
    case "keyboard":
      return "Keyboard"
  }
}
