"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import { DOODLES_BY_ID } from "../constants/doodles"
import { PRODUCTS_BY_CATEGORY } from "../constants/products"
import type {
  CartItem,
  Category,
  Position,
  Template,
} from "../types/workspace.types"

type Store = {
  cart: CartItem[]
  appliedTemplateId: string | null

  activeCategory: Category
  isCheckoutOpen: boolean
  swapOpenInstanceId: string | null

  setActiveCategory: (c: Category) => void
  addDoodle: (doodleId: string) => string
  swapProduct: (instanceId: string, productId: number) => void
  removeInstance: (instanceId: string) => void
  applyTemplate: (t: Template) => void
  reset: () => void
  openCheckout: () => void
  closeCheckout: () => void
  openSwap: (instanceId: string) => void
  closeSwap: () => void
}

let instanceCounter = 0
const nextInstanceId = () =>
  `ci_${Date.now().toString(36)}_${(instanceCounter++).toString(36)}`

function defaultProductIdFor(category: Category): number {
  const first = PRODUCTS_BY_CATEGORY[category]?.[0]
  if (!first) throw new Error(`No products defined for category "${category}"`)
  return first.id
}

export const useWorkspaceStore = create<Store>()(
  persist(
    (set) => ({
      cart: [],
      appliedTemplateId: null,
      activeCategory: "chair",
      isCheckoutOpen: false,
      swapOpenInstanceId: null,

      setActiveCategory: (c) => set({ activeCategory: c }),

      addDoodle: (doodleId) => {
        const doodle = DOODLES_BY_ID[doodleId]
        if (!doodle) {
          throw new Error(`addDoodle: unknown doodleId "${doodleId}"`)
        }
        const instanceId = nextInstanceId()
        set({
          cart: [
            ...useWorkspaceStore.getState().cart,
            {
              instanceId,
              doodleId: doodle.id,
              productId: defaultProductIdFor(doodle.category),
            },
          ],
          appliedTemplateId: null,
        })
        return instanceId
      },

      swapProduct: (instanceId, productId) => {
        set((s) => ({
          cart: s.cart.map((ci) =>
            ci.instanceId === instanceId ? { ...ci, productId } : ci
          ),
          appliedTemplateId: null,
        }))
      },

      removeInstance: (instanceId) => {
        set((s) => ({
          cart: s.cart.filter((ci) => ci.instanceId !== instanceId),
        }))
      },

      applyTemplate: (t) => {
        const newCart: CartItem[] = t.slots.map((slot) => {
          const doodle = DOODLES_BY_ID[slot.doodleId]
          if (!doodle) {
            throw new Error(`Template ${t.id} references unknown doodle ${slot.doodleId}`)
          }
          return {
            instanceId: nextInstanceId(),
            doodleId: slot.doodleId,
            productId: defaultProductIdFor(doodle.category),
          }
        })
        const _position: Position | undefined = undefined 
        void _position
        set({
          cart: newCart,
          appliedTemplateId: t.id,
        })
      },

      reset: () =>
        set({
          cart: [],
          appliedTemplateId: null,
        }),

      openCheckout: () => set({ isCheckoutOpen: true }),
      closeCheckout: () => set({ isCheckoutOpen: false }),

      openSwap: (instanceId) => set({ swapOpenInstanceId: instanceId }),
      closeSwap: () => set({ swapOpenInstanceId: null }),
    }),
    {
      name: "monis-designer-cart",
      partialize: (s) => ({
        cart: s.cart,
        appliedTemplateId: s.appliedTemplateId,
      }),
      version: 2,
    }
  )
)
