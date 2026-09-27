"use client"

import { useEffect, useState } from "react"
import type { ReactNode } from "react"

/**
 * Configuration for a modal opened via {@link modals}.
 *
 * `content` and `footer` accept either a plain `ReactNode` or a function that
 * receives `{ close }`. The function form is called inside `<Modals/>` during
 * React's render phase and must return a real React element — never call hooks
 * directly inside it. Wrap any component that uses hooks in its own component
 * and have the function return `<MyComponent />`.
 */
export interface ModalConfig {
  id: string
  title?: ReactNode
  description?: ReactNode
  content?:
    | ReactNode
    | ((args: { close: () => void }) => ReactNode)
  footer?:
    | ReactNode
    | ((args: { close: () => void }) => ReactNode)
  /** Center the title text. Defaults to false. */
  centeredTitle?: boolean
  /** Disable dismiss-on-Esc and dismiss-on-backdrop. Defaults to true. */
  dismissable?: boolean
  /** Extra className merged onto `DialogContent`. */
  className?: string
}

interface ModalState {
  modal: ModalConfig | null
}

const actionTypes = {
  OPEN_MODAL: "OPEN_MODAL",
  DISMISS_MODAL: "DISMISS_MODAL",
} as const

type Action =
  | { type: typeof actionTypes.OPEN_MODAL; modal: ModalConfig }
  | { type: typeof actionTypes.DISMISS_MODAL }

const reducer = (state: ModalState, action: Action): ModalState => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return { ...state, modal: action.modal }
    case actionTypes.DISMISS_MODAL:
      return { ...state, modal: null }
  }
}

const listeners: Array<(state: ModalState) => void> = []
let memoryState: ModalState = { modal: null }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

/**
 * Build an imperative modal handle. Call `.open()` to show, `.close()` to hide.
 *
 * ```tsx
 * const handle = modals({
 *   id: "delete-project",
 *   title: "Delete project?",
 *   content: <p>This cannot be undone.</p>,
 *   footer({ close }) {
 *     return (
 *       <Button onClick={close}>OK</Button>
 *     )
 *   },
 * })
 * handle.open()
 * ```
 */
function modals(config: ModalConfig) {
  return {
    open: () => dispatch({ type: actionTypes.OPEN_MODAL, modal: config }),
    close: () => dispatch({ type: actionTypes.DISMISS_MODAL }),
  }
}

/**
 * Subscribe to the modal store. Used by the `<Modals/>` singleton renderer and
 * by any consumer that needs to read or dismiss the current modal.
 */
function useModals() {
  const [state, setState] = useState<ModalState>(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return {
    requestedModal: state.modal,
    dismiss: () => dispatch({ type: actionTypes.DISMISS_MODAL }),
  }
}

export { modals, useModals }
