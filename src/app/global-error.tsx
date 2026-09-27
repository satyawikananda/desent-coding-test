"use client"

import "@/styles/globals.css"

import { AppError } from "@/components/base/app-error"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-background font-sans text-foreground antialiased">
        <main className="min-h-dvh">
          <AppError
            error={error}
            reset={reset}
            title="The starter hit an unexpected error"
          />
        </main>
      </body>
    </html>
  )
}
