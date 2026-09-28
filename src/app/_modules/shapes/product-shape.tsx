"use client"

import { useSyncExternalStore } from "react"
import {
  Editor,
  HTMLContainer,
  Rectangle2d,
  ShapeUtil,
  T,
  type TLBaseShape,
} from "tldraw"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { useWorkspaceStore } from "../stores/workspace.store"
import { DOODLES_BY_ID } from "../constants/doodles"
import { getProductById, formatWeekly } from "../utils/helpers"
import type { Category } from "../types/workspace.types"

export type ProductShapeProps = {
  productId: number
  doodleId: string
  scale: number
}

export type ProductShape = TLBaseShape<"product", ProductShapeProps>

declare module "tldraw" {
  export interface TLGlobalShapePropsMap {
    product: ProductShapeProps
  }
}

const PRODUCT_TYPE = "product" as const

type Corner = "nw" | "ne" | "sw" | "se"

const CORNERS: readonly Corner[] = ["nw", "ne", "sw", "se"] as const

function useIsSwapOpen(instanceId: string): boolean {
  return useSyncExternalStore(
    (cb) => useWorkspaceStore.subscribe(cb),
    () => useWorkspaceStore.getState().swapOpenInstanceId === instanceId,
    () => false
  )
}

export class ProductShapeUtil extends ShapeUtil<ProductShape> {
  static override type = PRODUCT_TYPE
  static override props = {
    productId: T.number,
    doodleId: T.string,
    scale: T.number,
  }

  getDefaultProps(): ProductShapeProps {
    return { productId: 0, doodleId: "chair", scale: 1 }
  }

  getGeometry(shape: ProductShape): Rectangle2d {
    const doodle = DOODLES_BY_ID[shape.props.doodleId] ?? DOODLES_BY_ID["chair"]!
    const scale = shape.props.scale ?? 1
    return new Rectangle2d({
      width: doodle.width * scale,
      height: doodle.height * scale,
      isFilled: true,
    })
  }

  override getIndicatorPath(shape: ProductShape): Path2D {
    const doodle = DOODLES_BY_ID[shape.props.doodleId] ?? DOODLES_BY_ID["chair"]!
    const scale = shape.props.scale ?? 1
    const path = new Path2D()
    path.rect(0, 0, doodle.width * scale, doodle.height * scale)
    return path
  }

  override canResize(): boolean {
    return false
  }
  override hideResizeHandles(): boolean {
    return true
  }

  override onDoubleClick(): void {
    // no-op designer doodles aren't editable text
  }

  override onClick(shape: ProductShape): void {
    const instanceId = (shape.meta as { instanceId?: unknown }).instanceId
    if (typeof instanceId !== "string") return
    useWorkspaceStore.getState().openSwap(instanceId)
  }

  component(shape: ProductShape): React.ReactElement {
    return <ProductShapeView shape={shape} editor={this.editor} />
  }
}

function ProductShapeView({
  shape,
  editor,
}: {
  shape: ProductShape
  editor: Editor
}) {
  const doodle = DOODLES_BY_ID[shape.props.doodleId] ?? DOODLES_BY_ID["chair"]!
  const scale = shape.props.scale ?? 1
  const width = doodle.width * scale
  const height = doodle.height * scale
  const isSelected = editor.getSelectedShapeIds().includes(shape.id)

  const product = getProductById(shape.props.productId)
  const productName = product?.name ?? labelForCategory(doodle.category)
  const productPriceLabel = product
    ? formatWeekly(product.weekly_price)
    : null

  const instanceId = (shape.meta as { instanceId?: unknown }).instanceId
  const instanceIdStr = typeof instanceId === "string" ? instanceId : ""
  const isSwapOpen = useIsSwapOpen(instanceIdStr)

  const handleCornerResizeStart = (
    e: React.PointerEvent<HTMLDivElement>,
    corner: Corner
  ) => {
    e.stopPropagation()
    e.preventDefault()
    editor.markEventAsHandled(e.nativeEvent)
    editor.setSelectedShapes([shape.id])

    const startX = e.clientX
    const startY = e.clientY
    const startScale = shape.props.scale ?? 1
    const camera = editor.getCamera()
    const baseW = doodle.width * startScale
    const baseH = doodle.height * startScale
    const startShapeX = shape.x
    const startShapeY = shape.y

    const onMove = (ev: PointerEvent) => {
      const dxPage = (ev.clientX - startX) / camera.z
      const dyPage = (ev.clientY - startY) / camera.z

      let newShapeX = startShapeX
      let newShapeY = startShapeY
      let newW = baseW
      let newH = baseH
      if (corner === "nw") {
        newW = baseW - dxPage
        newH = baseH - dyPage
        newShapeX = startShapeX + dxPage
        newShapeY = startShapeY + dyPage
      } else if (corner === "ne") {
        // Drag NE, anchor SW: top-right moves with cursor, SW stays put.
        newW = baseW + dxPage
        newH = baseH - dyPage
        newShapeY = startShapeY + dyPage
        // newShapeX stays = startShapeX (left edge anchored)
      } else if (corner === "sw") {
        // Drag SW, anchor NE: bottom-left moves with cursor, NE stays put.
        newW = baseW - dxPage
        newH = baseH + dyPage
        newShapeX = startShapeX + dxPage
        // newShapeY stays = startShapeY (top edge anchored)
      } else {
        // se — Drag SE, anchor NW: bottom-right moves with cursor, NW stays.
        newW = baseW + dxPage
        newH = baseH + dyPage
        // both shape.x and shape.y stay fixed
      }

      const scaleX = newW / doodle.width
      const scaleY = newH / doodle.height
      const nextScale = Math.max(0.3, Math.min(4, (scaleX + scaleY) / 2))

      editor.updateShape({
        id: shape.id,
        type: PRODUCT_TYPE,
        x: newShapeX,
        y: newShapeY,
        props: { ...shape.props, scale: nextScale },
      })
    }
    const onUp = () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
      window.removeEventListener("pointercancel", onUp)
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    window.addEventListener("pointercancel", onUp)
  }

  const cornerStyle = (corner: Corner): React.CSSProperties => {
    const size = 16
    const offset = -size / 2
    const cursor =
      corner === "nw" || corner === "se" ? "nwse-resize" : "nesw-resize"
    const base: React.CSSProperties = {
      position: "absolute",
      width: size,
      height: size,
      pointerEvents: "auto",
      cursor,
      zIndex: 10,
    }
    switch (corner) {
      case "nw":
        return { ...base, left: offset, top: offset }
      case "ne":
        return { ...base, right: offset, top: offset }
      case "sw":
        return { ...base, left: offset, bottom: offset }
      case "se":
        return { ...base, right: offset, bottom: offset }
    }
  }

  return (
    <HTMLContainer
      data-swap-open={isSwapOpen ? "true" : undefined}
      style={{
        width,
        height,
        overflow: "visible",
        pointerEvents: "all",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={doodle.src}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
        }}
      />

      {isSelected
        ? CORNERS.map((corner) => (
            <div
              key={corner}
              onPointerDown={(e) => handleCornerResizeStart(e, corner)}
              aria-label={`Resize from ${corner}`}
              role="button"
              style={cornerStyle(corner)}
            />
          ))
        : null}

      {!isSelected ? (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={
                    productPriceLabel
                      ? `${productName}, ${productPriceLabel}`
                      : productName
                  }
                  style={{
                    position: "relative",
                    width: 44,
                    height: 44,
                    borderRadius: 9999,
                    border: 0,
                    padding: 0,
                    background: "transparent",
                    cursor: "pointer",
                    pointerEvents: "auto",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 2,
                      borderRadius: 9999,
                      backgroundColor: "var(--primary)",
                      opacity: 0.2,
                      animation: "tl-ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                    }}
                  />
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 14,
                      height: 14,
                      borderRadius: 9999,
                      backgroundColor: "var(--primary)",
                      boxShadow: "0 0 0 4px var(--background)",
                    }}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent sideOffset={8}>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium leading-tight">
                    {productName}
                  </span>
                  {productPriceLabel ? (
                    <span className="font-mono text-[10px] leading-tight opacity-80">
                      {productPriceLabel}
                    </span>
                  ) : null}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : null}
    </HTMLContainer>
  )
}

// Fallback display label for the pulse tooltip
function labelForCategory(category: Category): string {
  switch (category) {
    case "chair":
      return "Chair"
    case "desk":
      return "Desk"
    case "monitor":
      return "Monitor"
    case "lamp":
      return "Lamp"
    case "keyboard":
      return "Keyboard"
  }
}
