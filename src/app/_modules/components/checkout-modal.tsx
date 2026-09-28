"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useCartTotals } from "../hooks/use-cart-totals"
import { useWorkspaceStore } from "../stores/workspace.store"
import { formatMonthly } from "../utils/helpers"

export function CheckoutModal() {
  const isOpen = useWorkspaceStore((s) => s.isCheckoutOpen)
  const closeCheckout = useWorkspaceStore((s) => s.closeCheckout)
  const reset = useWorkspaceStore((s) => s.reset)

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && closeCheckout()}>
      <DialogContent
        key={isOpen ? "open" : "closed"}
        showCloseButton={false}
        className={cn(
          "max-h-[90vh] w-full gap-0 overflow-y-auto rounded-none p-0 sm:max-w-120 sm:rounded-2xl",
          "border-border bg-card"
        )}
      >
        <DialogTitle className="sr-only">Your setup</DialogTitle>
        <CheckoutContent
          onClose={closeCheckout}
          onDone={() => {
            closeCheckout()
            // Clear after a short delay so users see the success state flash closed.
            setTimeout(() => reset(), 250)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

function CheckoutContent({
  onClose,
  onDone,
}: {
  onClose: () => void
  onDone: () => void
}) {
  const removeInstance = useWorkspaceStore((s) => s.removeInstance)
  const { items, weekly, monthly, savings, hasBundle } = useCartTotals()

  const [setupService, setSetupService] = useState(true)
  const [deliveryDate, setDeliveryDate] = useState("")
  const [confirmed, setConfirmed] = useState(false)

  const today = new Date().toISOString().slice(0, 10)

  return (
    <AnimatePresence mode="wait">
      {confirmed ? (
        <SuccessView
          key="success"
          date={deliveryDate}
          onDone={onDone}
        />
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Your setup
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-6 p-6">
            {/* Line items */}
            <ul className="divide-y divide-border rounded-xl border border-border">
              {items.map((line) => {
                return (
                  <li
                    key={line.instanceId}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={line.product.image}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-md object-cover"
                    />
                    <span className="min-w-0 flex-1 truncate font-heading text-sm font-semibold text-foreground">
                      {line.product.name}
                    </span>
                    <span className="font-mono text-sm font-medium text-muted-foreground">
                      ${line.product.weekly_price}/wk
                    </span>
                    <button
                      type="button"
                      onClick={() => removeInstance(line.instanceId)}
                      aria-label={`Remove ${line.product.name}`}
                      className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* Subtotal */}
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Subtotal
              </p>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Weekly</span>
                <span className="font-mono text-sm font-medium text-foreground">
                  ${weekly}/wk
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Monthly</span>
                <span className="font-mono text-2xl font-semibold text-foreground">
                  {formatMonthly(monthly)}
                </span>
              </div>
              {hasBundle ? (
                <div className="flex items-baseline justify-between pt-1 text-primary">
                  <span className="text-sm font-medium">
                    🎉 Bundle savings
                  </span>
                  <span className="font-mono text-sm font-semibold">
                    −{formatMonthly(savings)}
                  </span>
                </div>
              ) : null}
            </div>

            <div className="border-t border-border" />

            {/* Add-ons */}
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Add-ons
              </p>
              <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                <Checkbox
                  id="setup-service"
                  checked={setupService}
                  onCheckedChange={(c) => setSetupService(c === true)}
                  className="mt-0.5"
                />
                <Label
                  htmlFor="setup-service"
                  className="flex-1 cursor-pointer"
                >
                  <span className="font-heading text-sm font-semibold text-foreground">
                    Setup service (free)
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    Our team assembles everything for you
                  </span>
                </Label>
              </div>
            </div>

            {/* Delivery */}
            <div className="space-y-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Delivery
              </p>
              <Label htmlFor="delivery-date" className="sr-only">
                Delivery date
              </Label>
              <Input
                id="delivery-date"
                type="date"
                min={today}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                We&apos;ll deliver to your Bali address.
              </p>
            </div>

            {/* Confirm */}
            <Button
              size="lg"
              className="w-full"
              onClick={() => setConfirmed(true)}
              disabled={!deliveryDate}
            >
              Confirm rental →
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function SuccessView({ date, onDone }: { date: string; onDone: () => void }) {
  const formatted = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "your selected date"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 22 }}
      className="flex flex-col items-center gap-3 px-6 py-12 text-center"
    >
      <span className="text-5xl leading-none" aria-hidden>
        🌴
      </span>
      <h2 className="font-heading text-2xl font-semibold text-foreground">
        Your setup is on the way 🌴
      </h2>
      <div className="space-y-1 text-sm text-muted-foreground">
        <p>We&apos;ll deliver to your Bali address by {formatted}.</p>
        <p>Setup is included.</p>
      </div>
      <p className="pt-2 text-sm italic text-muted-foreground">
        Access beats ownership.
      </p>
      <Button
        size="lg"
        variant="outline"
        className="mt-6 w-full"
        onClick={onDone}
      >
        Done
      </Button>
    </motion.div>
  )
}
