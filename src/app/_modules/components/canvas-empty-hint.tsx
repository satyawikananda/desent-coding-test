"use client"

import { useSyncExternalStore } from "react"
import type { Editor } from "tldraw"

import { cn } from "@/lib/utils"

import { PRODUCT_SHAPE_UTILS } from "../shapes"

type Props = {
  editor: Editor | null
}

const PRODUCT_TYPE = PRODUCT_SHAPE_UTILS[0]!.type

function subscribeToEditor(editor: Editor | null, cb: () => void) {
  if (!editor) return () => {}
  return editor.store.listen(() => cb())
}

function readHasProducts(editor: Editor | null): boolean {
  if (!editor) return false
  return editor.getCurrentPageShapes().some((s) => s.type === PRODUCT_TYPE)
}

export function CanvasEmptyHint({ editor }: Props) {
  const hasProducts = useSyncExternalStore(
    (cb) => subscribeToEditor(editor, cb),
    () => readHasProducts(editor),
    () => false
  )

  if (!editor || hasProducts) return null

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 text-center"
      )}
    >
      <span className="text-5xl leading-none" aria-hidden>
        🖥️
      </span>
      <p className="font-sans text-lg text-foreground">Let&apos;s design your workspace</p>
      <p className="text-[13px] text-muted-foreground">
        - Create a perfect setup -
      </p>
    </div>
  )
}
