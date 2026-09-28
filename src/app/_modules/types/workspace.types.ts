export type Category = "chair" | "desk" | "monitor" | "lamp" | "keyboard"

/**
 * A doodle is the visual representation of a cart slot on the canvas.
 * Multiple doodles may exist per category for variety; one is shown per
 * cart instance. Source images live in public/images/doodles/.
 */
export type Doodle = {
  /** Stable id, matches the webp filename: "chair", "desk-1", "lamp-2", etc. */
  id: string
  category: Category
  /** Absolute path served from /public. */
  src: string
  /** Natural width in pixels (used to size the tldraw shape). */
  width: number
  /** Natural height in pixels. */
  height: number
}

/**
 * A cart entry. `productId` is the FK into `src/data/items.ts` (an Item.id,
 * which is a number). Always set — defaults to the first product in the
 * category when a slot is added, and updated when the user picks a
 * different product from the swap popover.
 */
export type CartItem = {
  /** Unique per cart entry. Same doodle can be added multiple times. */
  instanceId: string
  /** Which doodle image is rendered on the canvas. */
  doodleId: string
  /** Which product the user actually picked from src/data. */
  productId: number
}

export type Position = {
  x: number
  y: number
}

export type TemplateSlot = {
  doodleId: string
  defaultPosition: Position
}

export type Template = {
  id: string
  emoji: string
  name: string
  description: string
  slots: TemplateSlot[]
}


export type CartLine = {
  instanceId: string
  doodleId: string
  product: import("@/data/items.type").Item
}

export type CartTotals = {
  items: CartLine[]
  weekly: number
  monthly: number
  savings: number
  hasBundle: boolean
}
