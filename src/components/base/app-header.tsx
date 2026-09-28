import Link from "next/link"

import { cn } from "@/lib/utils"

export function AppHeader({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "border-b border-border bg-background",
        "px-4 py-3 md:px-6 md:py-4",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-heading text-[22px] font-bold leading-none tracking-tight"
        >
          <span className="text-foreground">monis</span>
          <span className="text-primary">.</span>
          <span className="text-foreground">rent</span>
        </Link>

        <div className="hidden text-right sm:block">
          <p className="font-heading text-base font-medium leading-tight text-foreground">
            Design your workspace
          </p>
          <p className="text-[13px] leading-tight text-muted-foreground">
            Rent everything and be at home anywhere.
          </p>
        </div>
      </div>
    </header>
  )
}
