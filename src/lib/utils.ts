import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Replaces the favicon's fill color with the given CSS color by fetching
 * the source SVG, swapping its `fill="#000000"` declaration, and pointing
 * the document's `<link rel="icon">` at the resulting data URL.
 *
 * Uses a data URL — the resource is inline, so the browser has nothing
 * cached to fall back on — and only mutates the existing link's `href`.
 * Detaching Next.js's auto-generated icon link externally breaks its
 * metadata reconciliation (`Cannot read properties of null (reading
 * 'removeChild')` during page unmount), so we leave the node in place.
 *
 * Safe to call on the server — it no-ops when `document` is undefined.
 */
export async function setFaviconColor(
  color: string,
  src = "/images/fio-icon.svg",
  signal?: AbortSignal
): Promise<void> {
  if (typeof document === "undefined") return

  try {
    const response = await fetch(src, { signal })
    if (!response.ok) return
    const svg = await response.text()
    const recolored = svg.replace(/fill="#000000"/g, `fill="${color}"`)
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(recolored)}`

    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (!link) {
      link = document.createElement("link")
      link.rel = "icon"
      link.type = "image/svg+xml"
      document.head.appendChild(link)
    }
    link.type = "image/svg+xml"
    link.href = dataUrl
  } catch {
    // Silently ignore — favicon updates are non-critical.
  }
}
