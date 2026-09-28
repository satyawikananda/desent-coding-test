"use client"

import { useEffect, useRef } from "react"
import {
  createShapeId,
  type Editor,
  type TLShape,
  type TLShapeId,
} from "tldraw"

import { useWorkspaceStore } from "../stores/workspace.store"
import type { ProductShape } from "../shapes/product-shape"
const PRODUCT_TYPE = "product" as const

function isProductShape(s: TLShape): s is ProductShape {
  return s.type === PRODUCT_TYPE
}

function shapeToInstance(s: ProductShape): string | undefined {
  const m = s.meta as { instanceId?: unknown } | undefined
  return typeof m?.instanceId === "string" ? m.instanceId : undefined
}

export function useCanvasSync(editor: Editor | null) {
  const isApplyingFromZustand = useRef(false)

  useEffect(() => {
    if (!editor) return

    const apply = (cart: ReturnType<typeof useWorkspaceStore.getState>["cart"]) => {
      const currentShapes = editor
        .getCurrentPageShapes()
        .filter(isProductShape)

      const shapeByInstance = new Map<string, ProductShape>()
      for (const s of currentShapes) {
        const id = shapeToInstance(s)
        if (id) shapeByInstance.set(id, s)
      }

      const cartByInstance = new Map(cart.map((ci) => [ci.instanceId, ci]))

      
      const toRemove: TLShapeId[] = []
      for (const [instanceId, shape] of shapeByInstance) {
        if (!cartByInstance.has(instanceId)) toRemove.push(shape.id)
      }

      const toUpdate: { id: TLShapeId; props: { productId: number } }[] = []
      for (const [instanceId, shape] of shapeByInstance) {
        const ci = cartByInstance.get(instanceId)
        if (!ci) continue
        if (shape.props.productId !== ci.productId) {
          toUpdate.push({
            id: shape.id,
            props: { productId: ci.productId },
          })
        }
      }

      const toCreate = cart.filter((ci) => !shapeByInstance.has(ci.instanceId))

      if (toRemove.length === 0 && toUpdate.length === 0 && toCreate.length === 0) return

      isApplyingFromZustand.current = true
      editor.run(
        () => {
          if (toRemove.length) editor.deleteShapes(toRemove)
          if (toUpdate.length) {
            editor.updateShapes(
              toUpdate.map((u) => ({
                id: u.id,
                type: PRODUCT_TYPE,
                props: u.props,
              }))
            )
          }
          if (toCreate.length) {
            const center = editor.getViewportPageBounds().center
            const created = toCreate.map((ci, i) => ({
              id: createShapeId(),
              type: PRODUCT_TYPE,
              x: center.x - 90 + (i % 3) * 60,
              y: center.y - 60 + Math.floor(i / 3) * 60,
              props: { productId: ci.productId, doodleId: ci.doodleId, scale: 1 },
              meta: { instanceId: ci.instanceId },
            }))
            editor.createShapes(created)
          }
        },
        { history: "ignore" }
      )
      queueMicrotask(() => {
        isApplyingFromZustand.current = false
      })
    }

    apply(useWorkspaceStore.getState().cart)

    const unsubStore = useWorkspaceStore.subscribe((state, prev) => {
      if (state.cart !== prev.cart) apply(state.cart)
    })

    return () => {
      unsubStore()
    }
  }, [editor])

  useEffect(() => {
    if (!editor) return
    const off = editor.store.listen((entry) => {
      if (isApplyingFromZustand.current) return
      // Only react to user-initiated changes; ignore remote-sync / undo, etc.
      if (entry.source !== "user") return
      const removed = entry.changes.removed as Record<string, unknown>
      if (!removed) return
      const removeInstance = useWorkspaceStore.getState().removeInstance
      for (const id of Object.keys(removed)) {
        const record = removed[id] as { typeName?: string; type?: string; meta?: unknown } | undefined
        if (!record || record.typeName !== "shape") continue
        if (record.type !== PRODUCT_TYPE) continue
        const meta = record.meta as { instanceId?: unknown } | undefined
        const instanceId = meta?.instanceId
        if (typeof instanceId === "string") {
          removeInstance(instanceId)
        }
      }
    })
    return () => {
      off()
    }
  }, [editor])
}
