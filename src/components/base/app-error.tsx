"use client"

import { useEffect } from "react"
import Link from "next/link"
import { House, RefreshCw, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"

interface AppErrorProps {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
  description?: string
  retryLabel?: string
  homeLabel?: string
}

export function AppError({
  error,
  reset,
  title = "Something went off-script",
  description = "We couldn't finish this view. Try again, or head back to the starter.",
  retryLabel = "Try again",
  homeLabel = "Back home",
}: AppErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section
      role="alert"
      aria-labelledby="app-error-title"
      className="flex min-h-[70dvh] w-full flex-col items-center justify-center gap-6 px-6 py-16 text-center"
    >
      <div className="flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <TriangleAlert aria-hidden="true" className="size-6" />
      </div>

      <div className="flex max-w-lg flex-col items-center gap-2">
        <h1
          id="app-error-title"
          className="font-heading text-3xl font-semibold tracking-tight text-balance"
        >
          {title}
        </h1>
        <p className="max-w-prose text-pretty text-muted-foreground">
          {description}
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Reference: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button type="button" onClick={reset} icon={<RefreshCw />}>
          {retryLabel}
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <House aria-hidden="true" />
            {homeLabel}
          </Link>
        </Button>
      </div>
    </section>
  )
}
