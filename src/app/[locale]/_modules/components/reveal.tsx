"use client"

import { memo } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  mode?: "load" | "scroll"
}

function RevealComponent({
  children,
  className,
  delay = 0,
  mode = "scroll",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const initial = shouldReduceMotion
    ? false
    : { opacity: 0, transform: "translateY(32px)" }
  const visible = { opacity: 1, transform: "translateY(0px)" }
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.56, delay, ease: [0.23, 1, 0.32, 1] as const }

  if (mode === "load") {
    return (
      <motion.div
        initial={initial}
        animate={visible}
        transition={transition}
        className={cn(className)}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={initial}
      whileInView={visible}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export const Reveal = memo(RevealComponent)
