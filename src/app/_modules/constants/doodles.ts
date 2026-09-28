import type { Category, Doodle } from "../types/workspace.types"

export const DOODLES: Doodle[] = [
  { id: "chair", category: "chair", src: "/images/doodles/chair.webp", width: 200, height: 280 },

  { id: "desk-1", category: "desk", src: "/images/doodles/desk-1.webp", width: 360, height: 200 },
  { id: "desk-2", category: "desk", src: "/images/doodles/desk-2.webp", width: 340, height: 180 },
  { id: "desk-3", category: "desk", src: "/images/doodles/desk-3.webp", width: 380, height: 200 },

  
  { id: "monitor-1", category: "monitor", src: "/images/doodles/monitor-1.webp", width: 280, height: 200 },
  { id: "monitor-2", category: "monitor", src: "/images/doodles/monitor-2.webp", width: 320, height: 180 },
  { id: "monitor-3", category: "monitor", src: "/images/doodles/monitor-3.webp", width: 300, height: 200 },

  { id: "lamp-1", category: "lamp", src: "/images/doodles/lamp-1.webp", width: 160, height: 280 },
  { id: "lamp-2", category: "lamp", src: "/images/doodles/lamp-2.webp", width: 180, height: 260 },

  { id: "keyboard-fallback", category: "keyboard", src: "/images/doodles/keyboard.webp", width: 280, height: 120 },
]

export const DOODLES_BY_ID: Record<string, Doodle> = DOODLES.reduce(
  (acc, d) => {
    acc[d.id] = d
    return acc
  },
  {} as Record<string, Doodle>
)

export const DOODLES_BY_CATEGORY: Record<Category, Doodle[]> = DOODLES.reduce(
  (acc, d) => {
    acc[d.category].push(d)
    return acc
  },
  { chair: [], desk: [], monitor: [], lamp: [], keyboard: [] } as Record<Category, Doodle[]>
)

export const CATEGORIES: Category[] = ["chair", "desk", "monitor", "lamp", "keyboard"]
