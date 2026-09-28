"use client"

import { motion } from "motion/react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { TEMPLATES } from "../constants/templates"
import { useWorkspaceStore } from "../stores/workspace.store"

const SPRING = { type: "spring", stiffness: 300, damping: 25 } as const

export function TemplatePicker() {
  const appliedTemplateId = useWorkspaceStore((s) => s.appliedTemplateId)
  const applyTemplate = useWorkspaceStore((s) => s.applyTemplate)

  return (
    <div className="space-y-3">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Start with a template
      </p>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
        {TEMPLATES.map((t) => {
          const isApplied = appliedTemplateId === t.id
          return (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => applyTemplate(t)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING}
              className={cn(
                "flex w-45 shrink-0 flex-col gap-2 rounded-xl border bg-card p-3",
                "transition-all duration-200 md:w-auto md:shrink",
                isApplied
                  ? "border-2 border-primary shadow-md shadow-primary/20"
                  : "border-border hover:border-primary/40 hover:shadow-sm"
              )}
            >
              <div className="flex items-start gap-2">
                <span className="text-2xl leading-none">{t.emoji}</span>
              </div>
              <div className="text-left">
                <p className="font-heading text-sm font-semibold leading-tight text-foreground">
                  {t.name}
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
                  {t.description}
                </p>
                {isApplied ? (
                  <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-primary">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                    Applied
                  </p>
                ) : null}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

