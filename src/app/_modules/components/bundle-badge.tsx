"use client"

import { AnimatePresence, motion } from "motion/react"
import { PartyPopper } from "lucide-react"

import { cn } from "@/lib/utils"

export function BundleBadge({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="bundle-badge"
          initial={{ opacity: 0, x: 30, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full bg-primary",
            "px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-lg"
          )}
        >
          <PartyPopper
            className="h-4 w-4 -rotate-12"
            strokeWidth={2}
          />
          Bundle pricing unlocked — save 20%
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
