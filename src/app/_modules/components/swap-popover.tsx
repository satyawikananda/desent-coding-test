"use client"

import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Check, X } from "lucide-react"
import { useValue, type Editor, type Box } from "tldraw"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { DOODLES_BY_ID } from "../constants/doodles"
import { PRODUCTS_BY_CATEGORY } from "../constants/products"
import type { Category } from "../types/workspace.types"
import { useWorkspaceStore } from "../stores/workspace.store"

type Props = {
  editor: Editor | null
}

const POPUP_W = 280
const POPUP_H = 320
const GAP = 12

export function SwapPopover({ editor }: Props) {
  const cart = useWorkspaceStore((s) => s.cart)
  const swapProduct = useWorkspaceStore((s) => s.swapProduct)
  const removeInstance = useWorkspaceStore((s) => s.removeInstance)
  const swapOpenInstanceId = useWorkspaceStore((s) => s.swapOpenInstanceId)
  const closeSwap = useWorkspaceStore((s) => s.closeSwap)

  const containerRef = useRef<HTMLDivElement>(null)

  // Compute anchor position reactively from the open shape's bounds
  const pos = useValue<{ x: number; y: number } | null>(
    "swap-popover-pos",
    () => {
      if (!editor || !swapOpenInstanceId) return null
      const shape = editor
        .getCurrentPageShapes()
        .find(
          (s) =>
            s.type === "product" &&
            (s.meta as { instanceId?: string }).instanceId === swapOpenInstanceId
        )
      if (!shape) return null
      const pageBounds: Box | undefined = editor.getShapePageBounds(shape.id)
      if (!pageBounds) return null
      const right = editor.pageToScreen({ x: pageBounds.maxX, y: pageBounds.midY })
      const left = editor.pageToScreen({ x: pageBounds.minX, y: pageBounds.midY })
      const viewport = editor.getViewportPageBounds()
      const viewportScreenRight = editor.pageToScreen({ x: viewport.maxX, y: 0 }).x
      const viewportScreenLeft = editor.pageToScreen({ x: viewport.minX, y: 0 }).x

      // Try right side first.
      if (right.x + GAP + POPUP_W <= viewportScreenRight) {
        return { x: right.x + GAP, y: right.y - POPUP_H / 2 }
      }
      // Then left.
      if (left.x - GAP - POPUP_W >= viewportScreenLeft) {
        return { x: left.x - GAP - POPUP_W, y: left.y - POPUP_H / 2 }
      }
      // Otherwise center on shape - fallback
      const center = editor.pageToScreen({ x: pageBounds.midX, y: pageBounds.midY })
      return { x: center.x - POPUP_W / 2, y: center.y - POPUP_H / 2 }
    },
    [editor, swapOpenInstanceId]
  )

  useEffect(() => {
    if (!swapOpenInstanceId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSwap()
    }
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current) return
      if (containerRef.current.contains(e.target as Node)) return
      const target = e.target as HTMLElement | null
      if (target && target.closest('[data-swap-open="true"]')) return
      closeSwap()
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener("mousedown", onDown)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("mousedown", onDown)
    }
  }, [swapOpenInstanceId, closeSwap])

  if (!swapOpenInstanceId || !pos) return null

  const cartItem = cart.find((ci) => ci.instanceId === swapOpenInstanceId)
  if (!cartItem) return null
  const doodle = DOODLES_BY_ID[cartItem.doodleId]
  if (!doodle) return null
  const category = doodle.category as Category
  const variants = PRODUCTS_BY_CATEGORY[category] ?? []

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        key={swapOpenInstanceId}
        initial={{ opacity: 0, scale: 0.92, y: 6 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 6 }}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: POPUP_W,
          zIndex: 50,
        }}
        className={cn(
          "flex flex-col gap-1 rounded-xl border border-border bg-popover p-3 shadow-lg"
        )}
      >
        <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Swap {category}
        </p>

        <div className="max-h-65 space-y-1 overflow-y-auto">
          {variants.map((v) => {
            const isCurrent = v.id === cartItem.productId
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  swapProduct(swapOpenInstanceId, v.id)
                  closeSwap()
                  editor?.setSelectedShapes([])
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md p-2 text-left",
                  "transition-colors",
                  isCurrent ? "bg-secondary ring-1 ring-primary" : "hover:bg-secondary"
                )}
              >
                {isCurrent ? (
                  <Check className="h-3 w-3 shrink-0 text-primary" strokeWidth={3} />
                ) : (
                  <span className="h-3 w-3 shrink-0" />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={v.image}
                  alt=""
                  className="h-8 w-8 shrink-0 rounded object-cover"
                />
                <span className="min-w-0 flex-1 truncate text-sm text-foreground">
                  {v.name}
                </span>
                <span className="font-mono text-xs font-medium text-muted-foreground">
                  ${v.weekly_price}/wk
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-1 border-t border-border pt-2">
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() => {
              removeInstance(swapOpenInstanceId)
              closeSwap()
            }}
          >
            <X className="h-3.5 w-3.5" />
            Remove from setup
          </Button>
        </div>

        <span className="sr-only">{category} variants</span>
      </motion.div>
    </AnimatePresence>
  )
}
