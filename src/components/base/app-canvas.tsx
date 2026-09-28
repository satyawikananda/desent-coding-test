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

  const tlDrawLicenseKey = process.env.NEXT_PUBLIC_TLDRAW_LICENSE_KEY || ""

  return (
    <div className="app-canvas relative isolate h-full w-full overflow-hidden bg-background">
      {/* Workspace floor - static analogy backdrop, behind tldraw canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/doodles/mat-floor.webp"
          alt=""
          draggable={false}
          className="w-full max-w-3xl select-none"
        />
      </div>
      <Tldraw
        shapeUtils={PRODUCT_SHAPE_UTILS}
        persistenceKey="monis-designer-workspace"
        hideUi
        onMount={(e) => setEditor(e)}
        licenseKey={tlDrawLicenseKey}
      />
      <CanvasEmptyHint editor={editor} />
      <SwapPopover editor={editor} />
    </div>
  )
}
