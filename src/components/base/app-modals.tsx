"use client"

import { useCallback, useState } from "react"
import type { ReactNode } from "react"
import { AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { modals, useModals, type ModalConfig } from "@/hooks/use-modals"

/**
 * Singleton dialog renderer. Mounted once in the root layout. Subscribes to the
 * modal store via {@link useModals} and renders whatever is currently open.
 *
 * Any call site that needs to show a modal calls one of the helpers below
 * (`confirm`, `warn`) or builds a custom one with `modals({...}).open()`.
 * There is no need to redeclare `<Dialog>` at the call site.
 */
export function Modals() {
  const { requestedModal, dismiss } = useModals()

  const handleClose = useCallback(() => {
    dismiss()
  }, [dismiss])

  if (!requestedModal) return null

  const {
    title,
    description,
    content,
    footer,
    centeredTitle,
    dismissable = true,
    className,
  } = requestedModal

  const renderedContent =
    typeof content === "function" ? content({ close: handleClose }) : content

  const renderedFooter =
    typeof footer === "function" ? footer({ close: handleClose }) : footer

  return (
    <Dialog
      open={true}
      onOpenChange={(next) => {
        if (!next && !dismissable) return
        handleClose()
      }}
    >
      <DialogContent
        className={cn(
          "flex max-h-[80vh] flex-col gap-4 overflow-hidden",
          className,
        )}
      >
        {title !== undefined ? (
          <DialogHeader>
            <DialogTitle className={cn(centeredTitle && "text-center")}>
              {title}
            </DialogTitle>
            {description !== undefined && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        ) : (
          // Radix warns if DialogContent has no DialogTitle/Description.
          // `sr-only` keeps the node in the a11y tree; `className="hidden"`
          // would remove it and defeat the purpose.
          <DialogTitle className="sr-only">Dialog</DialogTitle>
        )}
        <div className="flex-1 overflow-y-auto">{renderedContent}</div>
        {renderedFooter && <DialogFooter>{renderedFooter}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

interface ConfirmContentProps {
  smallText?: string
}

function ConfirmContent({ smallText }: ConfirmContentProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-2 text-center">
      <AlertTriangle className="size-10 text-destructive" />
      {smallText && <p className="text-sm text-destructive">{smallText}</p>}
    </div>
  )
}

interface WarnContentProps {
  description?: ReactNode
  smallText?: string
}

function WarnContent({ description, smallText }: WarnContentProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-2 text-center">
      {description && <p className="text-sm text-foreground">{description}</p>}
      {smallText && <p className="text-xs text-destructive">{smallText}</p>}
    </div>
  )
}

interface ConfirmFooterProps {
  close: () => void
  onConfirm?: () => void | Promise<void>
  confirmText?: string
  cancelText?: string
  variant?: ButtonProps["variant"]
}

function ConfirmFooter({
  close,
  onConfirm,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "destructive",
}: ConfirmFooterProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirm = async () => {
    if (!onConfirm) {
      close()
      return
    }
    try {
      setIsLoading(true)
      await onConfirm()
    } finally {
      setIsLoading(false)
      close()
    }
  }

  return (
    <>
      <Button variant="outline" type="button" onClick={close} disabled={isLoading}>
        {cancelText}
      </Button>
      <Button
        type="button"
        variant={variant}
        onClick={handleConfirm}
        isLoading={isLoading}
      >
        {confirmText}
      </Button>
    </>
  )
}

interface WarnFooterProps {
  close: () => void
  okText?: string
}

function WarnFooter({ close, okText = "OK" }: WarnFooterProps) {
  return (
    <Button type="button" onClick={close}>
      {okText}
    </Button>
  )
}

interface ConfirmOptions {
  title: string
  description?: ReactNode
  onConfirm?: () => void | Promise<void>
  confirmText?: string
  cancelText?: string
  /** Button variant for the confirm action. Defaults to `destructive`. */
  variant?: ButtonProps["variant"]
  smallText?: string
  dismissable?: boolean
}

/**
 * Open a confirmation modal. Returns the underlying handle so callers can
 * `.close()` it programmatically if needed.
 *
 * ```tsx
 * confirm({
 *   title: "Delete project?",
 *   description: "This cannot be undone.",
 *   onConfirm: async () => await deleteProject(id),
 * })
 * ```
 */
function confirm(options: ConfirmOptions) {
  const handle = modals({
    id: "confirm",
    title: options.title,
    description: options.description,
    dismissable: options.dismissable,
    content: <ConfirmContent smallText={options.smallText} />,
    footer({ close }) {
      return (
        <ConfirmFooter
          close={close}
          onConfirm={options.onConfirm}
          confirmText={options.confirmText}
          cancelText={options.cancelText}
          variant={options.variant}
        />
      )
    },
  } satisfies ModalConfig)
  handle.open()
  return handle
}

interface WarnOptions {
  title?: string
  description?: ReactNode
  smallText?: string
  okText?: string
  dismissable?: boolean
}

/**
 * Open a warning modal with a single OK button. Returns the underlying handle.
 */
function warn(options: WarnOptions = {}) {
  const handle = modals({
    id: "warn",
    title: options.title ?? "Warning",
    description: options.description,
    dismissable: options.dismissable,
    content: (
      <WarnContent description={options.description} smallText={options.smallText} />
    ),
    footer({ close }) {
      return <WarnFooter close={close} okText={options.okText} />
    },
  } satisfies ModalConfig)
  handle.open()
  return handle
}

export { confirm, warn }
