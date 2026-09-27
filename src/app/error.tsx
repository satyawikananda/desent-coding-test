"use client"

import { AppError } from "@/components/base/app-error"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <AppError error={error} reset={reset} />
}
