"use client"

import type { ImageProps } from "next/image"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type AppImageFallbackProps = Omit<ImageProps, "src"> & {
  src?: ImageProps["src"] | null
  placeholderSrc: ImageProps["src"]
  useIO?: boolean
  rootMargin?: string
  threshold?: number | number[]
  isLoading?: boolean
}

/**
 * AppImageFallback
 *
 * A drop-in replacement for next/image that adds:
 * - Fallback support: swaps to a placeholder image when the main src fails.
 * - Loading placeholder: reserves the image area with a skeleton while loading.
 * - Optional IntersectionObserver-based lazy gate: only mounts the image
 *   once it enters the viewport, controlled via `useIO`, `rootMargin`, and `threshold`.
 *
 * Behavior:
 * - Uses `src` if provided, otherwise falls back to `placeholderSrc`.
 * - On load error, automatically replaces the current src with `placeholderSrc`.
 * - Tracks load state to fade in the image over its reserved loading state.
 * - When `useIO` is true, the image isn't rendered until the wrapper div
 *   intersects the viewport; otherwise, it behaves like a normal image.
 *
 * Props:
 * - `src?: ImageProps["src"] | null` - primary image source (optional).
 * - `placeholderSrc: ImageProps["src"]` - guaranteed fallback source.
 * - `useIO?: boolean` – enable/disable IntersectionObserver gating.
 * - `rootMargin?: string` – IO root margin for early/late loading.
 * - `threshold?: number | number[]` – IO threshold for visibility detection.
 * - `isLoading?: boolean` – external loading flag to force skeleton.
 * - All other props are forwarded to `next/image`.
 */
function AppImageFallback({
  src,
  placeholderSrc,
  useIO = false,
  rootMargin = "200px",
  threshold = 0,
  alt,
  isLoading = false,
  ...rest
}: AppImageFallbackProps) {
  const { loading, className, width, height, onError, onLoad, ...imageProps } =
    rest
  const gateRef = useRef<HTMLDivElement | null>(null)
  const [isInView, setIsInView] = useState(!useIO)
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null)
  const [loadedSrc, setLoadedSrc] = useState<ImageProps["src"] | null>(null)

  const currentSrc = !src || failedSrc === src ? placeholderSrc : src

  // Lazy load handling
  useEffect(() => {
    if (!useIO || !gateRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { root: null, rootMargin, threshold }
    )
    observer.observe(gateRef.current)
    return () => observer.disconnect()
  }, [useIO, rootMargin, threshold])

  const handleError: NonNullable<ImageProps["onError"]> = (event) => {
    if (src && currentSrc === src) {
      setFailedSrc(src)
    }
    onError?.(event)
  }

  const handleLoad: NonNullable<ImageProps["onLoad"]> = (event) => {
    setLoadedSrc(currentSrc)
    onLoad?.(event)
  }

  const showSkeleton = isLoading || loadedSrc !== currentSrc

  return (
    <div ref={gateRef} className="relative h-full w-full overflow-hidden">
      {showSkeleton ? (
        <Skeleton className="absolute inset-0 h-full w-full rounded-md bg-muted" />
      ) : null}
      {isInView && (
        <Image
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          onError={handleError}
          onLoad={handleLoad}
          loading={loading}
          className={cn(
            "transition-opacity duration-300 ease-out",
            showSkeleton ? "opacity-0" : "opacity-100",
            className
          )}
          {...imageProps}
        />
      )}
    </div>
  )
}

export default AppImageFallback
