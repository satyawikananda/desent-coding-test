import { ArrowUpRight } from "lucide-react"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

interface CtaLinkProps {
  children: ReactNode
  href: string
  className?: string
  variant?: "primary" | "secondary" | "text"
  icon?: ReactNode
  external?: boolean
}

export function CtaLink({
  children,
  href,
  className,
  variant = "primary",
  icon,
  external = false,
}: CtaLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group/cta inline-flex min-h-12 shrink-0 items-center justify-center gap-3 font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring",
        variant !== "text" && "rounded-md px-5 py-3",
        variant === "primary" &&
          "yt-tactile border-2 border-foreground bg-primary text-primary-foreground shadow-[3px_3px_0_var(--foreground)]",
        variant === "secondary" &&
          "border border-foreground/35 bg-background text-foreground transition-[background-color,border-color,transform] duration-180 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-foreground hover:bg-secondary active:scale-[0.98]",
        variant === "text" &&
          "min-h-11 justify-start text-foreground underline decoration-primary decoration-2 underline-offset-4 transition-[text-decoration-thickness] duration-200 hover:decoration-4 active:translate-y-px",
        className
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span>{children}</span>
      {icon ?? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
          strokeWidth={2}
        />
      )}
    </a>
  )
}
