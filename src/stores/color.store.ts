import { create } from "zustand"

interface ColorState {
  color: string | null
  setColor: (color: string) => void
  resetColor: () => void
}

/**
 * Color picker demo state.
 *
 * Intentionally NOT persisted — the picker is a demo on `/components`, not a
 * default behaviour. Reloading reverts the brand to the values defined in
 * `src/styles/globals.css`. Call `resetColor()` to revert during a session.
 *
 * The Zustand store still demonstrates the cross-component-state pattern
 * used by the picker and its route-local effects. The `persist` middleware is
 * deliberately omitted to keep the demo scoped.
 */
export const useColorStore = create<ColorState>()((set) => ({
  color: null,
  setColor: (color: string) => set({ color }),
  resetColor: () => set({ color: null }),
}))
