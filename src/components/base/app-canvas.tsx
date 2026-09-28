"use client"

import { useState } from "react"
import { Tldraw, type Editor } from "tldraw"
import "tldraw/tldraw.css"

import { CanvasEmptyHint } from "../../app/_modules/components/canvas-empty-hint"
import { SwapPopover } from "../../app/_modules/components/swap-popover"
import { useCanvasSync } from "../../app/_modules/hooks/use-canvas-sync"
import { PRODUCT_SHAPE_UTILS } from "../../app/_modules/shapes"

import "@/styles/tldraw-overrides.css"

export default function AppCanvas() {
  const [editor, setEditor] = useState<Editor | null>(null)
  useCanvasSync(editor)

  return (
    <div className="app-canvas relative isolate h-full w-full overflow-hidden bg-background">
      <Tldraw
        shapeUtils={PRODUCT_SHAPE_UTILS}
        persistenceKey="monis-designer-workspace"
        hideUi
        onMount={(e) => setEditor(e)}
      />
      <CanvasEmptyHint editor={editor} />
      <SwapPopover editor={editor} />
    </div>
  )
}
